
const body=document.body;
const drawer=document.querySelector('.mobile-drawer');
const burger=document.querySelector('.burger');
const closeDrawer=document.querySelector('.drawer-close');
const backdrop=document.querySelector('.drawer-backdrop');
const langDrop=document.querySelector('.lang-dropdown');
const langBtn=document.querySelector('.lang-trigger');
const modal=document.querySelector('.modal');
const modalOpen=document.querySelector('.privacy-open');
const modalX=document.querySelector('.modal-x');
const modalClose=document.querySelector('.modal-close');
let trapRoot=null;

function lockScroll(lock){body.classList.toggle('no-scroll',lock)}
function trapFocus(container){trapRoot=container;const f=[...container.querySelectorAll('button,a,input,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);if(f.length)f[0].focus();container.addEventListener('keydown',e=>{if(e.key==='Escape'){if(container===drawer)toggleDrawer(false);if(container===modal)toggleModal(false)}if(e.key==='Tab'){const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});}
function toggleDrawer(open){drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));backdrop.classList.toggle('open',open);burger.setAttribute('aria-expanded',String(open));lockScroll(open);if(open)trapFocus(drawer)}
function toggleModal(open){modal.classList.toggle('open',open);modal.setAttribute('aria-hidden',String(!open));lockScroll(open);if(open)trapFocus(modal.querySelector('.modal-card'))}

burger?.addEventListener('click',()=>toggleDrawer(true));
closeDrawer?.addEventListener('click',()=>toggleDrawer(false));
backdrop?.addEventListener('click',()=>{toggleDrawer(false);toggleModal(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggleDrawer(false);toggleModal(false)}});

langBtn?.addEventListener('click',()=>{const open=langDrop.classList.toggle('open');langBtn.setAttribute('aria-expanded',String(open));});
document.addEventListener('click',e=>{if(langDrop&&!langDrop.contains(e.target))langDrop.classList.remove('open');});

modalOpen?.addEventListener('click',()=>toggleModal(true));
modalX?.addEventListener('click',()=>toggleModal(false));
modalClose?.addEventListener('click',()=>toggleModal(false));

document.querySelectorAll('.faq-item').forEach(item=>{const q=item.querySelector('.faq-q');q.addEventListener('click',()=>{document.querySelectorAll('.faq-item').forEach(other=>{if(other!==item){other.classList.remove('open');other.querySelector('.faq-q').setAttribute('aria-expanded','false')}});const open=item.classList.toggle('open');q.setAttribute('aria-expanded',String(open));});});

const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
