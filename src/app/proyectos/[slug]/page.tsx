import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, type Demo } from '../../../data/projects';
import { site } from '../../../data/site';
import Header from '../../../components/Header';
import Reveal from '../../../components/Reveal';
import Device from '../../../components/Device';
import PanicPhone from '../../../components/PanicPhone';
import RouteDemo from '../../../components/RouteDemo';
import Icon from '../../../components/Icon';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} | ${site.name}`, description: p.pitch } : {};
}

function DemoView({ d }: { d: Demo }) {
  if (d.kind === 'panic-phone') return <PanicPhone />;
  if (d.kind === 'route')
    return (
      <figure className="device device-route">
        <RouteDemo />
        <figcaption>
          <span>{d.label}</span>
          <span>Datos inventados</span>
        </figcaption>
      </figure>
    );
  return <Device kind={d.kind} src={d.src} title={d.label} />;
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const small = p.demos.some((d) => d.kind !== 'laptop');
  const onlyPhone = p.demos.length === 1 && p.demos[0].kind === 'phone';

  return (
    <>
      <Reveal />
      <Header back />

      <main>
        <section className="p-hero">
          <div className="wrap">
            <div className="p-meta rise">
              <span className="pill pill-dark">{p.kind}</span>
              {p.confidential && <span className="p-note">Nombre de la empresa cambiado por confidencialidad.</span>}
            </div>
            <h1 className="rise" style={{ animationDelay: '.06s' }}>{p.name}</h1>
            <p className="p-pitch rise" style={{ animationDelay: '.14s' }}>{p.pitch}</p>
            <dl className="p-facts rise" style={{ animationDelay: '.2s' }}>
              <div><dt>Rol</dt><dd>Desarrollo completo</dd></div>
              <div><dt>Plataformas</dt><dd>{p.platforms}</dd></div>
              <div><dt>Estado</dt><dd>Terminado</dd></div>
            </dl>
          </div>
        </section>

        <section id="demo" className="p-demo" aria-label="Demo en vivo">
          <div className="wrap">
            <div className={`p-screens ${small ? 'has-small' : ''} ${onlyPhone ? 'only-phone' : ''} screens-${p.demos.length}`}>
              {p.demos.map((d, k) => (
                <div
                  key={d.label}
                  className={`screen-slot rise ${d.kind === 'phone' && d.desktopOnly ? 'screen-desktop' : ''}`}
                  data-central={d.kind === 'laptop' && d.src.includes('/central/') ? '' : undefined}
                  style={{ animationDelay: `${0.3 + k * 0.1}s` }}
                >
                  <DemoView d={d} />
                </div>
              ))}
            </div>
            <div className="p-actions">
              <p className="p-hint">Tocá cualquier pantalla para probarla, o abrila en pantalla completa.</p>
              {p.repo ? (
                <a className="btn btn-line" href={p.repo} target="_blank" rel="noopener noreferrer">Ver el código en GitHub</a>
              ) : (
                <span className="p-private"><Icon name="lock" size={16} /> Código privado, disponible para revisión</span>
              )}
            </div>
          </div>
        </section>

        <div className="wrap p-body">
          <div className="p-two">
            <section className="box box-soft reveal" aria-labelledby="t-problema">
              <h2 id="t-problema">El problema</h2>
              <p>{p.problem}</p>
            </section>
            <section className="box box-soft reveal" aria-labelledby="t-solucion" style={{ transitionDelay: '.08s' }}>
              <h2 id="t-solucion">Qué construí</h2>
              <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
            </section>
          </div>

          <section className="p-arch reveal" aria-labelledby="t-arq">
            <p className="eyebrow">Cómo está hecho</p>
            <h2 id="t-arq">Arquitectura</h2>
            <div className="arch">
              <div className="arch-row">
                {p.architecture.flow.map((n, k) => (
                  <div key={n.name} className="arch-group">
                    {k > 0 && (
                      <svg className="arch-arrow" width="44" height="16" viewBox="0 0 44 16" aria-hidden="true">
                        <path d="M2 8h38M34 3l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <div className={`node ${n.main ? 'node-main' : ''}`}>
                      <p className="node-name">{n.name}</p>
                      <p className="node-tech">{n.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
              {p.architecture.extra && (
                <div className="arch-row">
                  <div className="node">
                    <p className="node-name">{p.architecture.extra.node.name}</p>
                    <p className="node-tech">{p.architecture.extra.node.tech}</p>
                  </div>
                  <p className="arch-text">{p.architecture.extra.text}</p>
                </div>
              )}
              <p className="arch-text">{p.architecture.deploy}</p>
            </div>
          </section>

          <div className="p-two">
            <section className="box reveal" aria-labelledby="t-dec">
              <h2 id="t-dec">Decisiones técnicas</h2>
              <ul>{p.decisions.map((d) => <li key={d}>{d}</li>)}</ul>
            </section>
            <section className="box reveal" aria-labelledby="t-stack" style={{ transitionDelay: '.08s' }}>
              <h2 id="t-stack">Tecnologías</h2>
              <ul className="chips">
                {p.stack.map((t) => <li key={t} className="chip chip-soft">{t}</li>)}
              </ul>
            </section>
          </div>

          {p.challenges && (
            <section className="box reveal" aria-labelledby="t-apr">
              <h2 id="t-apr">Desafíos y aprendizajes</h2>
              <p>{p.challenges}</p>
            </section>
          )}

          <nav className="p-nav" aria-label="Otros proyectos">
            <a className="p-nav-link reveal" href={`/proyectos/${prev.slug}/`}>
              <span>Anterior</span>
              <strong>{prev.name}</strong>
            </a>
            <a className="p-nav-link p-nav-next reveal" href={`/proyectos/${next.slug}/`}>
              <span>Siguiente</span>
              <strong>{next.name}</strong>
            </a>
          </nav>
        </div>
      </main>
    </>
  );
}
