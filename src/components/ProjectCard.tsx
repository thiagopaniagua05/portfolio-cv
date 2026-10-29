import type { Project } from '../data/projects';
import Icon from './Icon';

/** Tarjeta de proyecto con vista previa: captura de la web, del celular o un mini mapa. */
export default function ProjectCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  const v = p.preview;
  return (
    <a className="pcard reveal" href={`/proyectos/${p.slug}/`} style={{ transitionDelay: `${delay}s` }}>
      <div className="pcard-preview" style={{ background: v.bg }}>
        {v.kind === 'web' && <img className="pimg pimg-web" src={v.img} alt={`Vista previa de ${p.name}`} loading="lazy" />}
        {v.kind === 'phone' && <img className="pimg pimg-phone" src={v.img} alt={`Vista previa de ${p.name}`} loading="lazy" />}
        {v.kind === 'map' && (
          <div className="pimg pimg-map" role="img" aria-label="Vista previa: recorrido de un camión en un mapa">
            <span className="m1" />
            <span className="m2" />
            <span className="m3" />
            <span className="m-stop" />
            <span className="m-truck" />
          </div>
        )}
      </div>
      <div className="pcard-body">
        <span className="pill">{p.kind}</span>
        <h3>{p.name}</h3>
        <p>{p.short}</p>
        <ul className="tags" aria-label="Tecnologías">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="more">
          Ver detalle <Icon name="arrowRight" size={16} />
        </span>
      </div>
    </a>
  );
}
