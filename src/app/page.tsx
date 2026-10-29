import { site, stack, timeline, about } from '../data/site';
import { projects } from '../data/projects';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import Icon from '../components/Icon';

const links = [
  { href: '#stack', label: 'Stack' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
];

const latest = projects[0];

export default function Home() {
  return (
    <>
      <Reveal />
      <Header links={links} />

      <main>
        <section id="inicio" className="hero">
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="status rise">
                <span className="pulse" aria-hidden="true" /> Disponible para sumarme a un equipo
              </p>
              <h1 className="rise" style={{ animationDelay: '.08s' }}>{site.name}</h1>
              <p className="hero-title rise" style={{ animationDelay: '.16s' }}>{site.title}</p>
              <p className="hero-text rise" style={{ animationDelay: '.24s' }}>{site.summary}</p>
              <div className="actions rise" style={{ animationDelay: '.32s' }}>
                <a className="btn btn-primary" href={`mailto:${site.email}`}>
                  <Icon name="mail" size={18} /> Escribime por email
                </a>
                <a className="btn btn-line" href="#proyectos">Ver proyectos</a>
              </div>
            </div>
            <aside className="facts rise" aria-label="Resumen" style={{ animationDelay: '.4s' }}>
              <dl>
                <div>
                  <span className="fact-ic"><Icon name="code" /></span>
                  <div><dt>Trabajo con</dt><dd>React, React Native y Node.js</dd></div>
                </div>
                <div>
                  <span className="fact-ic"><Icon name="school" /></span>
                  <div><dt>Estudio</dt><dd>Tecnicatura en Programación, UTN</dd></div>
                </div>
                <div>
                  <span className="fact-ic"><Icon name="shield" /></span>
                  <div>
                    <dt>Último proyecto</dt>
                    <dd><a href={`/proyectos/${latest.slug}/`}>{latest.name}</a></dd>
                  </div>
                </div>
                <div>
                  <span className="fact-ic"><Icon name="pin" /></span>
                  <div><dt>Ubicación</dt><dd>Buenos Aires. {site.modality}</dd></div>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="stack" className="band" aria-labelledby="stack-t">
          <div className="wrap">
            <p className="eyebrow reveal">Lo que uso</p>
            <h2 id="stack-t" className="reveal">Stack</h2>
            <p className="lead reveal">En azul, las tecnologías con las que más trabajo.</p>
            <div className="stack-grid">
              {stack.map((g, i) => (
                <div key={g.area} className="scard reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="scard-head">
                    <span className="fact-ic"><Icon d={g.icon} /></span>
                    <h3>{g.area}</h3>
                  </div>
                  <ul className="chips" aria-label={`Tecnologías de ${g.area}`}>
                    {g.main.map((t) => <li key={t} className="chip chip-main">{t}</li>)}
                    {g.rest.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="section" aria-labelledby="proy-t">
          <div className="wrap">
            <p className="eyebrow reveal">Lo que hice</p>
            <h2 id="proy-t" className="reveal">Proyectos</h2>
            <p className="lead reveal">Cada uno tiene una demo para probar y el detalle de cómo está hecho.</p>
            <div className="proj-grid">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} p={p} delay={(i % 2) * 0.08} />
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="band" aria-labelledby="exp-t">
          <div className="wrap exp-in">
            <div>
              <p className="eyebrow reveal">Trayectoria</p>
              <h2 id="exp-t" className="reveal">Experiencia y formación</h2>
              <p className="lead reveal">Trabajo, estudio y cursos, del más reciente al más antiguo.</p>
            </div>
            <ol className="timeline">
              {timeline.map((e) => (
                <li key={e.title} className="tl reveal">
                  <span className="tl-dot" aria-hidden="true" />
                  <p className="tl-when">{e.when}</p>
                  <h3>{e.title}</h3>
                  {e.place && <p className="tl-place">{e.place}</p>}
                  {e.text && <p className="tl-text">{e.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="sobre-mi" className="section" aria-labelledby="about-t">
          <div className="wrap about-in">
            <div>
              <p className="eyebrow reveal">Quién soy</p>
              <h2 id="about-t" className="reveal">Sobre mí</h2>
            </div>
            <div className="about-body">
              {about.text.map((t) => (
                <p key={t} className="reveal">{t}</p>
              ))}
              <ul className="traits">
                {about.traits.map((t, i) => (
                  <li key={t.title} className="trait reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact" aria-labelledby="cont-t">
          <div className="wrap contact-in">
            <div>
              <h2 id="cont-t" className="reveal">Contacto</h2>
              <p className="reveal">Si mi perfil te sirve para tu equipo, escribime y coordinamos una entrevista.</p>
              <a className="contact-mail reveal" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="contact-links reveal">
              <a className="btn btn-primary row" href={site.cv} download>
                Descargar CV en PDF <Icon name="download" />
              </a>
              <a className="btn btn-ghost row" href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub <span>thiagopaniagua05</span>
              </a>
              <a className="btn btn-ghost row" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span>in/thiagopaniagua</span>
              </a>
            </div>
          </div>
          <p className="wrap foot">{site.name}, {site.title.toLowerCase()}. {site.city}.</p>
        </section>
      </main>
    </>
  );
}
