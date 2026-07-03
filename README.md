# LIR TECH — Site de Vendas

Site completo da LIR TECH: loja online de tecnologia com carrinho de compras funcional e checkout via WhatsApp.

## Estrutura do projeto

```
lirtech-project/
├── index.html      # Estrutura da página
├── style.css       # Todos os estilos visuais
├── script.js       # Lógica do carrinho de compras e menu
├── images/         # Logotipo, banner e ilustrações dos produtos
│   ├── banner.png
│   ├── logo-mark.svg
│   ├── product-laptop.svg
│   ├── product-desktop.svg
│   ├── product-camera.svg
│   └── product-router.svg
└── README.md       # Este arquivo
```

## Como publicar

### GitHub Pages
1. Suba todos estes arquivos para um repositório no GitHub.
2. Vá em Settings → Pages → Branch: main → pasta: / (root) → Save.
3. O site fica disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

### Cloudflare Pages / Netlify
Arraste a pasta inteira (não só o index.html) na área de upload direto do serviço.

## Contacto configurado no site
- WhatsApp / Telefone: 868 581 810
- E-mail: lirtech1@gmail.com
- Localização: Moçambique

## Sobre o banner.png

O topo do site (`index.html`) usa atualmente um banner feito em código (HTML/CSS/SVG), que se adapta a qualquer tamanho de tela sem cortes. O arquivo `images/banner.png` é a versão em imagem do banner original, incluída para você usar em outros lugares onde só se aceita imagem (ex: cabeçalho do Google Sites, capa de redes sociais, WhatsApp Business).

Se preferir usar essa imagem como banner do próprio site em vez da versão em código, troque no `index.html` a `<div class="brand-banner">...</div>` por:
```html
<img src="images/banner.png" alt="LIR TECH" style="width:100%;border-radius:16px;">
```

## Substituir por fotos reais dos produtos

As imagens em `images/` são ilustrações vetoriais (SVG) criadas para representar cada categoria. Para usar fotos reais dos seus produtos:
1. Coloque as fotos (JPG ou PNG) dentro da pasta `images/` (ex: `laptop-real.jpg`).
2. No `index.html`, troque `src="images/product-laptop.svg"` por `src="images/laptop-real.jpg"` (e assim para os outros produtos).

## Personalização rápida
- Cores: editar as variáveis no topo do `style.css` (`:root { --blue: ...; --navy: ...; }`)
- Produtos e preços: editar diretamente no `index.html`, dentro da seção `<section class="products" id="produtos">`
- Número de WhatsApp: editar a constante `WHATSAPP_NUMBER` no início do `script.js`
