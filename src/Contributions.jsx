import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, DownloadSimple, FloppyDisk, PencilSimple, Plus, UploadSimple, X } from '@phosphor-icons/react';
import publishedContent from './content/contributions.json';
import './contributions.css';

const DRAFT_KEY = 'amk-contributions-draft-v1';
const clone = (value) => JSON.parse(JSON.stringify(value));

function loadContent() {
  if (!import.meta.env.DEV) return publishedContent;
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || publishedContent; }
  catch { return publishedContent; }
}

function ExternalLinks({ links = [] }) {
  return <div className="contrib-links">{links.map(({ label, href }) => (
    <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={15} aria-hidden="true" /></a>
  ))}</div>;
}

function Block({ block }) {
  if (block.type === 'heading') return <h2 id={block.id}>{block.text}</h2>;
  if (block.type === 'paragraph') return <p>{block.text}</p>;
  if (block.type === 'formula') return <pre className="contrib-formula"><code>{block.text}</code></pre>;
  if (block.type === 'quote') return <blockquote>{block.text}</blockquote>;
  if (block.type === 'note') return <aside className="contrib-note"><strong>{block.title}</strong><p>{block.text}</p></aside>;
  if (block.type === 'figure') return <figure className="contrib-figure"><img src={block.src} alt={block.alt || ''} /><figcaption>{block.caption}</figcaption></figure>;
  if (block.type === 'table') return <figure className="contrib-table"><div><table><thead><tr>{block.headers?.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows?.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption>{block.caption}</figcaption></figure>;
  if (block.type === 'gallery') return <div className="contrib-gallery">{block.images?.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt || ''} /><figcaption>{image.caption}</figcaption></figure>)}</div>;
  return null;
}

function Contents({ blocks }) {
  const headings = blocks.filter((block) => block.type === 'heading' && block.id);
  return <aside className="contrib-toc" aria-label="Article contents"><span>Contents</span>{headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}</aside>;
}

function ContributionsIndex({ content, openPiece }) {
  return <section className="contrib-page contrib-index section-pad" data-reveal>
    <header className="contrib-index-head">
      <code>{content.intro.eyebrow}</code>
      <h1>{content.intro.title}</h1>
      <p>{content.intro.summary}</p>
    </header>

    {content.pieces.map((piece) => <button className="contrib-feature" type="button" key={piece.slug} onClick={() => openPiece(piece.slug)}>
      <span className="contrib-feature-copy">
        <small>{piece.status} · {piece.year}</small>
        <strong>{piece.title}</strong>
        <span>{piece.summary}</span>
        <em>Read the work <ArrowUpRight size={16} aria-hidden="true" /></em>
      </span>
      <img src={piece.cover} alt={`${piece.title} preview`} />
    </button>)}

    <section className="contrib-working" aria-labelledby="working-title">
      <h2 id="working-title">Currently working on</h2>
      {content.working.map((item) => <article key={item.title}>
        <h3>{item.title}</h3><span>{item.status}</span><p>{item.description}</p>
      </article>)}
    </section>
  </section>;
}

function ContributionArticle({ piece, back }) {
  useEffect(() => { document.title = `${piece.title} — Abdullah Khawaja`; return () => { document.title = 'Abdullah Khawaja'; }; }, [piece.title]);
  return <section className="contrib-page contrib-article-page section-pad" data-reveal>
    <button type="button" className="contrib-back" onClick={back}><ArrowLeft size={16} />All contributions</button>
    <div className="contrib-article-layout">
      <Contents blocks={piece.blocks} />
      <article className="contrib-article">
        <header>
          <code>{piece.status} · {piece.year}</code>
          <h1>{piece.title}</h1>
          <p>{piece.dek}</p>
          <ExternalLinks links={piece.links} />
        </header>
        {piece.blocks.map((block, index) => <Block key={`${block.type}-${block.id || index}`} block={block} />)}
      </article>
    </div>
  </section>;
}

function Studio({ content, setContent, activeSlug }) {
  const [open, setOpen] = useState(false);
  const [pieceIndex, setPieceIndex] = useState(Math.max(0, content.pieces.findIndex((piece) => piece.slug === activeSlug)));
  const fileRef = useRef(null);
  const piece = content.pieces[pieceIndex];
  const updatePiece = (patch) => setContent((current) => ({ ...current, pieces: current.pieces.map((item, index) => index === pieceIndex ? { ...item, ...patch } : item) }));
  const updateLink = (index, patch) => updatePiece({ links: piece.links.map((link, linkIndex) => linkIndex === index ? { ...link, ...patch } : link) });
  const updateBlock = (index, patch) => updatePiece({ blocks: piece.blocks.map((block, blockIndex) => blockIndex === index ? { ...block, ...patch } : block) });
  const moveBlock = (index, by) => {
    const next = [...piece.blocks];
    const target = index + by;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updatePiece({ blocks: next });
  };
  const addPiece = () => {
    const next = { slug: `new-piece-${content.pieces.length + 1}`, status: 'draft', year: String(new Date().getFullYear()), title: 'Untitled contribution', dek: '', summary: '', links: [], cover: '', blocks: [{ type: 'heading', id: 'notes', text: 'Notes' }, { type: 'paragraph', text: 'Start writing here.' }] };
    setContent((current) => ({ ...current, pieces: [...current.pieces, next] }));
    setPieceIndex(content.pieces.length);
  };
  const updateWorking = (index, patch) => setContent((current) => ({ ...current, working: current.working.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) }));
  const readImage = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateBlock(index, { src: reader.result, alt: file.name });
    reader.readAsDataURL(file);
  };
  const save = () => localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
  const exportDraft = () => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }));
    link.download = 'contributions.json'; link.click(); URL.revokeObjectURL(link.href);
  };
  const importDraft = (file) => {
    const reader = new FileReader();
    reader.onload = () => { try { setContent(JSON.parse(reader.result)); } catch { /* invalid files leave the draft untouched */ } };
    reader.readAsText(file);
  };
  if (!import.meta.env.DEV) return null;
  return <>
    <button className="studio-launch" type="button" onClick={() => setOpen(true)}><PencilSimple size={17} />Edit contributions</button>
    {open && <aside className="studio-panel" aria-label="Contribution editor">
      <header><div><code>dev only</code><strong>Contribution editor</strong></div><button type="button" onClick={() => setOpen(false)} aria-label="Close editor"><X /></button></header>
      <div className="studio-actions">
        <button type="button" onClick={save}><FloppyDisk />Save draft</button>
        <button type="button" onClick={exportDraft}><DownloadSimple />Export JSON</button>
        <button type="button" onClick={() => fileRef.current.click()}><UploadSimple />Import</button>
        <input ref={fileRef} hidden type="file" accept="application/json" onChange={(event) => event.target.files[0] && importDraft(event.target.files[0])} />
      </div>
      <label>Page<select value={pieceIndex} onChange={(event) => setPieceIndex(Number(event.target.value))}>{content.pieces.map((item, index) => <option key={item.slug} value={index}>{item.title}</option>)}</select></label>
      <button type="button" className="studio-add" onClick={addPiece}><Plus />Add written piece</button>
      <h2>Currently working on</h2>
      {content.working.map((item, index) => <div className="studio-block" key={index}>
        <input aria-label={`Working item ${index + 1} title`} value={item.title} onChange={(event) => updateWorking(index, { title: event.target.value })} />
        <input aria-label={`Working item ${index + 1} status`} value={item.status} onChange={(event) => updateWorking(index, { status: event.target.value })} />
        <textarea aria-label={`Working item ${index + 1} description`} rows={3} value={item.description} onChange={(event) => updateWorking(index, { description: event.target.value })} />
      </div>)}
      {piece && <>
        {['title', 'slug', 'status', 'year', 'dek', 'summary', 'cover'].map((field) => <label key={field}>{field}<textarea rows={field === 'summary' ? 4 : 2} value={piece[field] || ''} onChange={(event) => updatePiece({ [field]: event.target.value })} /></label>)}
        <h2>Source links</h2>
        {piece.links.map((link, index) => <div className="studio-link" key={index}><input aria-label={`Link ${index + 1} label`} value={link.label} onChange={(event) => updateLink(index, { label: event.target.value })} /><input aria-label={`Link ${index + 1} URL`} value={link.href} onChange={(event) => updateLink(index, { href: event.target.value })} /><button type="button" onClick={() => updatePiece({ links: piece.links.filter((_, linkIndex) => linkIndex !== index) })}>Remove</button></div>)}
        <button type="button" className="studio-add" onClick={() => updatePiece({ links: [...piece.links, { label: 'Source', href: 'https://' }] })}><Plus />Add link</button>
        <h2>Ordered article blocks</h2>
        {piece.blocks.map((block, index) => <div className="studio-block" key={index}>
          <div><select value={block.type} onChange={(event) => updateBlock(index, { type: event.target.value })}>{['heading', 'paragraph', 'quote', 'formula', 'figure', 'table', 'gallery', 'note'].map((type) => <option key={type}>{type}</option>)}</select><button onClick={() => moveBlock(index, -1)} aria-label="Move block up">↑</button><button onClick={() => moveBlock(index, 1)} aria-label="Move block down">↓</button><button onClick={() => updatePiece({ blocks: piece.blocks.filter((_, blockIndex) => blockIndex !== index) })} aria-label="Delete block">×</button></div>
          {(block.type === 'heading' || block.type === 'note') && <input value={block.title || block.text || ''} onChange={(event) => updateBlock(index, block.type === 'heading' ? { text: event.target.value, id: event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') } : { title: event.target.value })} />}
          {block.type === 'figure' && <><input placeholder="/assets/... or data URL" value={block.src || ''} onChange={(event) => updateBlock(index, { src: event.target.value })} /><input type="file" accept="image/*" onChange={(event) => readImage(index, event.target.files[0])} /></>}
          {block.type === 'table' && <textarea rows={8} defaultValue={JSON.stringify({ headers: block.headers || [], rows: block.rows || [], caption: block.caption || '' }, null, 2)} onBlur={(event) => { try { updateBlock(index, JSON.parse(event.target.value)); } catch { /* keep the previous table until valid JSON is entered */ } }} />}
          {block.type === 'gallery' && <textarea rows={8} defaultValue={JSON.stringify(block.images || [], null, 2)} onBlur={(event) => { try { updateBlock(index, { images: JSON.parse(event.target.value) }); } catch { /* keep the previous gallery until valid JSON is entered */ } }} />}
          {block.type !== 'heading' && block.type !== 'gallery' && block.type !== 'table' && <textarea rows={4} value={block.text || block.caption || ''} onChange={(event) => updateBlock(index, block.type === 'figure' ? { caption: event.target.value } : { text: event.target.value })} />}
        </div>)}
        <button type="button" className="studio-add" onClick={() => updatePiece({ blocks: [...piece.blocks, { type: 'paragraph', text: 'New paragraph.' }] })}><Plus />Add block</button>
      </>}
      <p className="studio-help">Changes preview immediately. Save keeps them in this browser. Export before asking a new chat to promote them.</p>
    </aside>}
  </>;
}

export default function Contributions({ path, navigate }) {
  const [content, setContent] = useState(loadContent);
  const activeSlug = useMemo(() => path.split('/')[2] || '', [path]);
  const piece = content.pieces.find((item) => item.slug === activeSlug);
  return <>
    {piece ? <ContributionArticle piece={piece} back={() => navigate('/contributions')} /> : <ContributionsIndex content={content} openPiece={(slug) => navigate(`/contributions/${slug}`)} />}
    <Studio content={content} setContent={setContent} activeSlug={activeSlug} />
  </>;
}
