/**
 * Plataforma textual y sistema de marca — Venta Empedrada V2
 * Mantiene todos los relatos, valores, prácticas, rituales de mesa, paleta cromática y
 * reglas tipográficas creadas para Venta Empedrada, adaptados a los bloques estructurales V2.
 */

export const BRAND_IDENTITY = {
  brandName: 'Venta Empedrada',
  institutionalName: 'Finca La Venta Empedrada',
  location: 'Interior de Almería · Andalucía',
  tagline: 'El sabor de volver a la tierra',
  heroHeadline: 'Venta Empedrada',
  heroSubheadline: 'El sabor de volver a la tierra',
  heroLead:
    'Aceite de oliva virgen extra Picual, miel de romero y almendra Marcona de nuestra finca en Almería. Una pequeña despensa para disfrutar en casa y compartir.',
  briefAbout:
    'Venta Empedrada nace alrededor de una antigua venta del interior de Almería. Recuperamos sus bancales y su vocación de dar de comer para crear una despensa de aceite, miel y almendras. Productos con origen, hechos para disfrutar y compartir.',
  purpose:
    'Hacer que cuidar una finca se traduzca en alimentos que merezcan un lugar habitual en la mesa.',
  audienceNote:
    'Diseñado priorizando claridad, legibilidad (cuerpo ≥ 18 px, alto contraste olivo sobre caliza) y compra propia o asistida sin complicaciones.',
};

export const STORY_CHAPTERS = [
  {
    id: 'origen-camino',
    title: 'Una venta junto al camino de piedra',
    text: 'Antes de ser una etiqueta, Venta Empedrada fue una mesa. Junto a un camino de piedra del interior de Almería, una pequeña venta ofrecía a quienes pasaban pan, aceite y un lugar donde descansar. A su alrededor crecían olivos y almendros; en las lindes, el romero marcaba la llegada de la primavera.',
  },
  {
    id: 'recuperacion',
    title: 'Recuperar la tierra y sus bancales',
    text: 'Cuando decidimos recuperar la finca, nos interesaba conservar algo más que sus paredes. Empezamos por reparar los bancales de piedra seca, cuidar los árboles centenarios y devolver la vegetación a los márgenes. En el romeral instalamos las colmenas, atentas a cada floración.',
  },
  {
    id: 'despensa-hoy',
    title: 'La mesa de la venta sigue abierta',
    text: 'Hoy, aquel gesto de hospitalidad toma la forma de una pequeña despensa. El Picual aporta carácter a una rebanada de pan. La miel de romero acompaña el primer yogur del día. La Marcona se sirve en un cuenco que pasa de mano en mano.',
  },
];

export const VALUES_PILLARS = [
  {
    title: 'Hospitalidad',
    summary:
      'Ayudar a elegir, explicar usos reales en cocina y ofrecer un regalo fácil de compartir.',
  },
  {
    title: 'Sabor',
    summary:
      'Seleccionar cada lote por su perfil sensorial y mostrar la manera más sencilla de disfrutarlo.',
  },
  {
    title: 'Cuidado de la tierra',
    summary:
      'Cubiertas vegetales según el agua disponible, protección de bancales y márgenes florales.',
  },
  {
    title: 'Transparencia',
    summary:
      'Hacer visible el origen común, la cosecha y el recorrido de cada botella, tarro o bolsa.',
  },
];

export const FIELD_PRACTICES = [
  {
    id: 'origen-comun',
    title: 'Origen común en la finca de Almería',
    summary:
      'Parcelas y lotes identificados del olivar y el almendral junto a la ubicación exacta del colmenar.',
    detail:
      'En cada etiqueta y contraetiqueta reservamos espacio para el código de lote y la parcela. El futuro QR enlazará directamente con esta ficha de cosecha, acompañada siempre de un enlace legible por escrito.',
  },
  {
    id: 'produccion-ecologica',
    title: 'Cultivo ecológico y respetuoso con la floración',
    summary:
      'Sin herbicidas de síntesis ni tratamientos agresivos que alteren los suelos o el entorno apícola.',
    detail:
      'El respeto por los insectos polinizadores y la flora melífera permite que el romeral conviva con los olivos y almendros de secano. Toda certificación vigente quedará reflejada con su número oficial en los artes finales.',
  },
  {
    id: 'practicas-regenerativas',
    title: 'Prácticas regenerativas y conservación del suelo',
    summary:
      'Reparación de muros de bancal, cubiertas vegetales vivas y retención natural de la lluvia.',
    detail:
      'En climas secos de interior, proteger cada centímetro de suelo fértil evita la erosión. Enseñamos quién cuida cada parcela y qué se observa tras las lluvias de otoño.',
  },
  {
    id: 'proteccion-envio',
    title: 'Envases protectores y envíos seguros',
    summary:
      'Vidrio oscuro para proteger el Picual de la luz, vidrio hermético para la miel y bolsa barrera opaca para la Marcona.',
    detail:
      'La caja La Mesa de la Venta incorpora separadores rígidos interiores que inmovilizan la botella y el tarro para garantizar que lleguen intactos a tu casa o a la de quien recibe el regalo.',
  },
];

export const TABLE_RITUALS = [
  {
    id: 'pan-picual',
    moment: 'Mediodía y cena',
    product: 'AOVE Picual · 500 ml',
    accent: '#293D32',
    headline: 'Pan, un plato y un buen aceite',
    body: 'Tuesta una rebanada de hogaza, añade un hilo generoso de Picual en crudo y nota su frescor verde. Ideal también sobre verduras asadas, tomates cortados o cremas tibias.',
  },
  {
    id: 'yogur-miel',
    moment: 'Desayuno tranquilo',
    product: 'Miel de romero · 500 g',
    accent: '#BE852C',
    headline: 'Una cucharada en el yogur del día',
    body: 'Deja que la miel de romero se funda despacio sobre un buen yogur natural o queso fresco. Si cristaliza con el frío, recuerda que es señal de miel viva sin sobrecalentar.',
  },
  {
    id: 'cuenco-marcona',
    moment: 'Aperitivo y conversación',
    product: 'Almendra Marcona · 250 g',
    accent: '#AB5E43',
    headline: 'Un cuenco en el centro de la mesa',
    body: 'Sin sal añadida para apreciar su dulzor limpio. Sírvelas tal cual con un vino de la tierra o saltéalas dos minutos con romero fresco y unas gotas de aceite.',
  },
];

export const MOSAIC_TILES = [
  {
    id: 'tile-olivar',
    title: 'AOVE Picual',
    subtitle: 'El Olivar · 500 ml',
    accent: '#293D32',
    image: './images/producto-picual.jpg',
    imageAlt: 'Botella de Aceite de Oliva Virgen Extra Picual Venta Empedrada',
    actionType: 'category',
    categoryId: 'olivar',
    targetId: 'recomendamos',
  },
  {
    id: 'tile-romeral',
    title: 'Miel de Romero',
    subtitle: 'El Romeral · 500 g',
    accent: '#BE852C',
    image: './images/producto-miel.jpg',
    imageAlt: 'Tarro de Miel de Romero Venta Empedrada',
    actionType: 'category',
    categoryId: 'romeral',
    targetId: 'recomendamos',
  },
  {
    id: 'tile-almendral',
    title: 'Almendra Marcona',
    subtitle: 'El Almendral · 250 g',
    accent: '#AB5E43',
    image: './images/producto-almendra.jpg',
    imageAlt: 'Bolsa de Almendra Marcona Venta Empedrada',
    actionType: 'category',
    categoryId: 'almendral',
    targetId: 'recomendamos',
  },
  {
    id: 'tile-finca',
    title: 'La Finca y su historia',
    subtitle: 'Camino de piedra · Almería',
    accent: '#293D32',
    image: './images/finca-amanecer.png',
    imageAlt: 'Camino empedrado y bancales de la finca al amanecer',
    actionType: 'anchor',
    targetId: 'finca',
  },
  {
    id: 'tile-regalo',
    title: 'Caja La Mesa de la Venta',
    subtitle: 'Colección completa y regalo',
    accent: '#293D32',
    image: './images/caja-mesa-venta.png',
    imageAlt: 'Caja regalo La Mesa de la Venta con los tres productos',
    actionType: 'anchor',
    targetId: 'la-mesa-de-la-venta',
  },
  {
    id: 'tile-lotes',
    title: 'Origen y Lotes',
    subtitle: 'Trazabilidad y ecología',
    accent: '#293D32',
    image: './images/mesa-consumo.png',
    imageAlt: 'Mesa con tostadas de aceite, yogur con miel y almendras',
    actionType: 'anchor',
    targetId: 'practicas',
  },
];

export const COLOR_PALETTE_SPEC = [
  {
    name: 'Olivo',
    hex: '#293D32',
    role: 'Color principal de marca, tipografía titular, botones primarios e identificador del AOVE Picual.',
    contrastNote: 'Contraste superior a 10:1 sobre fondo Caliza.',
  },
  {
    name: 'Caliza',
    hex: '#F4F0E7',
    role: 'Lienzo cálido de toda la tienda, inspirado en los muros encalados, la piedra y el papel de etiqueta.',
    contrastNote: 'Evita el blanco clínico frío; descansa la vista en lecturas largas.',
  },
  {
    name: 'Miel',
    hex: '#BE852C',
    role: 'Identificador visual de la familia Miel de romero y acentos florales en envase y fichas.',
    contrastNote: 'Combinado siempre con texto oscuro (#1D2621) para mantener > 4.5:1.',
  },
  {
    name: 'Barro',
    hex: '#AB5E43',
    role: 'Identificador visual de la familia Almendra Marcona y detalles de terracota de las tinajas.',
    contrastNote: 'Tono cálido terroso equilibrado con blanco caliza o tinta oscura.',
  },
];

export const BRAND_RULES = [
  {
    title: 'Logotipo y símbolo del empedrado',
    description:
      'El nombre se dispone en dos líneas con tipografía serif Georgia Regular ("VENTA / EMPEDRADA"). Lo acompañan tres piedras en perspectiva que evocan el camino de acceso y las tres familias de producto.',
  },
  {
    title: 'Tipografía y legibilidad (+50 años)',
    description:
      'Georgia Regular aporta dignidad artesanal en titulares (32–48 px). Calibri/Carlito ordena cantidades, ficha de lote y lectura larga (cuerpo mínimo de 18 px, interlineado 1.55 y ancho máximo de línea 60 ch).',
  },
  {
    title: 'Jerarquía del frontal y la ficha web',
    description:
      'Orden inalterable para reducir carga cognitiva: Marca → Categoría → Variedad o floración → Cantidad. Primero se muestra qué es y cómo se disfruta; después, el origen y las pruebas de campo.',
  },
  {
    title: 'Voz acogedora, serena y precisa',
    description:
      'Habla de tú, sin artificios ni exageraciones. Verbos tangibles y cotidianos: abrir, servir, probar, cuidar y compartir. Cero urgencias falsas ni ventanas emergentes agresivas.',
  },
];

