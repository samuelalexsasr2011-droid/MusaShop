import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Search, ShoppingBag, Menu, X, Plus, Minus, Trash2, PackageCheck, Store, Truck, ShieldCheck, ChevronDown, Heart, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

type Product = { id: number; name: string; category: string; description: string; image: string; price?: number; tag?: string; link?: string };
const products: Product[] = [
  { id: 1, name: "Produto em destaque 01", category: "Destaques", description: "Cadastre aqui a descrição real deste produto.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", tag: "Destaque" },
  { id: 2, name: "Produto em destaque 02", category: "Destaques", description: "Imagem ilustrativa. Substitua pelos dados do seu catálogo.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Produto em destaque 03", category: "Acessórios", description: "Consulte disponibilidade e condições para lojistas.", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=85", tag: "Novidade" },
  { id: 4, name: "Produto em destaque 04", category: "Casa & estilo", description: "Cadastre informações, variações e link de compra.", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Produto em destaque 05", category: "Acessórios", description: "Produto demonstrativo, sem preço ou estoque inventado.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Produto em destaque 06", category: "Casa & estilo", description: "Adicione o link do produto quando estiver disponível.", image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85" },
];
const categories = ["Todos", "Destaques", "Acessórios", "Casa & estilo"];

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notice, setNotice] = useState("");
  const visibleProducts = useMemo(() => products.filter(p => (category === "Todos" || p.category === category) && (p.name + " " + p.description + " " + p.category).toLowerCase().includes(query.toLowerCase())), [category, query]);
  const cartItems = products.filter(p => cart[p.id]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + (p.price || 0) * cart[p.id], 0);
  const updateCart = (id: number, delta: number) => setCart(current => ({ ...current, [id]: Math.max(0, (current[id] || 0) + delta) }));
  const sendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = cartItems.map(p => `${cart[p.id]}x ${p.name}`).join("\n");
    const body = `Solicitação de pedido MusaShop\nEmpresa: ${businessName}\nContato: ${customerName}\nE-mail: ${customerEmail}\n\nItens:\n${lines}\n\nSolicito retorno com preços, disponibilidade e condições para revenda.`;
    setNotice("Seu pedido foi preparado. Configure um canal de atendimento ou backend para enviar pedidos diretamente.");
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "solicitacao-musashop.txt"; a.click(); URL.revokeObjectURL(url);
  };
  return <main className="musa-site" id="inicio">
    <div className="musa-topline">ATENDIMENTO PARA LOJISTAS E REVENDEDORES <span>•</span> SEU PRÓXIMO PARCEIRO DE NEGÓCIOS</div>
    <header className="musa-header">
      <a href="#inicio" className="musa-logo" aria-label="MusaShop início"><span className="musa-logo-mark">M<span>.</span></span><span className="musa-logo-name">MusaShop<small>ATACADO & REVENDA</small></span></a>
      <button className="musa-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "musa-nav open" : "musa-nav"}><a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a><a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a><a href="#vantagens" onClick={() => setMenuOpen(false)}>Para lojistas</a><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></nav>
      <button className="musa-cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/> Meu pedido <span>{count}</span></button>
    </header>
    <section className="musa-hero">
      <div className="musa-hero-copy"><div className="musa-eyebrow"><span/> FEITO PARA QUEM VENDE</div><h1>Seu negócio merece <em>mais.</em></h1><p>Encontre produtos para abastecer sua loja e crescer com um parceiro que entende de revenda.</p><div className="musa-hero-actions"><a href="#catalogo" className="musa-primary-button">Explorar catálogo <ArrowRight size={18}/></a><a href="#vantagens" className="musa-text-link">Conheça a MusaShop <ArrowRight size={16}/></a></div><div className="musa-hero-proof"><span><ShieldCheck size={17}/></span> Uma experiência simples, pensada para negócios.</div></div>
      <div className="musa-hero-visual"><div className="musa-hero-image-wrap"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=90" alt="Interior de loja organizado e contemporâneo"/><div className="musa-image-caption"><span>SEU PRÓXIMO PASSO</span><strong>Começa por aqui.</strong></div></div><div className="musa-floating-card"><span className="musa-float-icon"><PackageCheck size={22}/></span><span><b>Pronto para revender?</b><small>Monte sua lista de produtos</small></span><ArrowRight size={18}/></div><div className="musa-red-orb"/></div>
      <div className="musa-hero-watermark">MUSA</div>
    </section>
    <section className="musa-benefits" id="vantagens"><div><span><Store size={21}/></span><b>Feito para lojistas</b><small>Uma vitrine pensada para revenda</small></div><div><span><PackageCheck size={21}/></span><b>Pedido organizado</b><small>Monte sua lista em poucos cliques</small></div><div><span><Truck size={21}/></span><b>Condições sob consulta</b><small>Combine disponibilidade e entrega</small></div><div><span><ShieldCheck size={21}/></span><b>Mais clareza</b><small>Informações sem surpresas</small></div></section>
    <section className="musa-catalog" id="catalogo"><div className="musa-section-heading"><div><div className="musa-eyebrow"><span/> EXPLORE A MUSA</div><h2>Encontre o que sua loja <em>precisa.</em></h2><p>Explore o catálogo demonstrativo e monte sua lista de interesse.</p></div><div className="musa-catalog-count">{visibleProducts.length} produtos <span>no catálogo</span></div></div>
      <div className="musa-catalog-tools"><div className="musa-search"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar produtos..." aria-label="Buscar produtos"/></div><div className="musa-categories"><SlidersHorizontal size={17}/>{categories.map(c=><button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
      <div className="musa-product-grid">{visibleProducts.map((p, i)=><article className="musa-product-card" key={p.id} style={{animationDelay: `${i * 70}ms`}}><button className="musa-product-image" onClick={() => { setCartOpen(true); }} aria-label={`Ver pedido para ${p.name}`}><img src={p.image} alt={`Imagem ilustrativa de ${p.name}`} loading="lazy"/>{p.tag && <span className="musa-product-tag">{p.tag}</span>}<span className="musa-image-arrow"><ArrowRight size={18}/></span></button><div className="musa-product-info"><span className="musa-product-category">{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><div className="musa-product-bottom"><span className="musa-price-note">Preço para lojista<br/><b>Sob consulta</b></span><button className="musa-add-button" onClick={() => updateCart(p.id, 1)}><Plus size={17}/> Adicionar</button></div></div></article>)}</div>
      {visibleProducts.length === 0 && <div className="musa-empty">Nenhum produto encontrado. Tente outra busca ou categoria.</div>}
      <p className="musa-demo-note">Catálogo demonstrativo: nomes, categorias e imagens devem ser substituídos pelos produtos reais. Preços e estoque não foram inventados.</p>
    </section>
    <section className="musa-cta-band" id="contato"><div className="musa-cta-pattern">M.</div><div><span className="musa-cta-label">VAMOS CRESCER JUNTOS?</span><h2>Sua próxima boa parceria começa aqui.</h2><p>Monte seu pedido de interesse e envie os dados para preparar uma solicitação organizada.</p></div><button className="musa-cta-button" onClick={() => setCartOpen(true)}>Montar meu pedido <ArrowRight size={18}/></button></section>
    <footer className="musa-footer"><a href="#inicio" className="musa-logo"><span className="musa-logo-mark">M<span>.</span></span><span className="musa-logo-name">MusaShop<small>ATACADO & REVENDA</small></span></a><p>Uma vitrine para conectar produtos, lojas e novas oportunidades.</p><span>© {new Date().getFullYear()} MusaShop. Todos os direitos reservados.</span></footer>
    {cartOpen && <div className="musa-overlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false); }}><aside className="musa-drawer" role="dialog" aria-modal="true" aria-label="Meu pedido"><div className="musa-drawer-head"><div><span className="musa-eyebrow"><span/> SUA LISTA</span><h2>Meu pedido <small>({count})</small></h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar pedido"><X/></button></div>{cartItems.length === 0 ? <div className="musa-cart-empty"><ShoppingBag size={38}/><h3>Sua lista está vazia</h3><p>Adicione produtos do catálogo para montar seu pedido de interesse.</p><button className="musa-primary-button" onClick={() => setCartOpen(false)}>Explorar catálogo <ArrowRight size={17}/></button></div> : <><div className="musa-cart-items">{cartItems.map(p=><div className="musa-cart-item" key={p.id}><img src={p.image} alt=""/><div className="musa-cart-item-copy"><b>{p.name}</b><small>Preço e disponibilidade sob consulta</small><div className="musa-quantity"><button onClick={() => updateCart(p.id, -1)} aria-label="Diminuir quantidade"><Minus size={14}/></button><span>{cart[p.id]}</span><button onClick={() => updateCart(p.id, 1)} aria-label="Aumentar quantidade"><Plus size={14}/></button><button className="musa-remove" onClick={() => setCart(current => ({...current, [p.id]: 0}))} aria-label="Remover produto"><Trash2 size={14}/></button></div></div></div>)}</div><form className="musa-order-form" onSubmit={sendOrder}><h3>Dados para contato</h3><label>Nome completo<input required value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Seu nome"/></label><label>Nome da loja / empresa<input required value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Sua empresa"/></label><label>E-mail<input required type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="voce@empresa.com"/></label><p>Ao finalizar, será baixado um resumo do pedido para você enviar ao atendimento da MusaShop. O envio automático ainda precisa ser configurado.</p><button className="musa-primary-button" type="submit">Preparar solicitação <ArrowRight size={17}/></button>{notice && <div className="musa-notice" role="status">{notice}</div>}</form></>}</aside></div>}
  </main>;
}
