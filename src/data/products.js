/**
 * Catálogo oficial de lanzamiento — Colección Venta Empedrada V2
 * Conserva exactamente los productos, precios, trazabilidad y textos de marca creados,
 * añadiendo el desglose de medida y filtros para la estructura de catálogo ampliado.
 */

export const SHIPPING_CONFIG = {
  standardCost: 6.5,
  freeThreshold: 55,
  estimatedDays: '48–72 h laborables',
  packagingNote:
    'Caja con separadores protectores pensada para vidrio y envío seguro desde Almería.',
};

export const PRODUCTS = [
  {
    id: 'picual-500',
    sku: 'VE-AOVE-500',
    categoryKey: 'olivar',
    category: 'Aceite de Oliva Virgen Extra',
    shortFamily: 'El Olivar',
    name: 'AOVE Picual',
    subtitle: 'Carácter verde para terminar tus platos',
    format: '500 ml',
    unitMeasureLabel: '500 ml | 3,30 € / 100 ml',
    containerType: 'Botella de vidrio oscuro con dosificador',
    price: 16.5,
    accentToken: 'olivo',
    accentColor: '#293D32',
    badgeTextColor: '#FFFFFF',
    ctaLabel: 'Añadir el Picual',
    image: './images/producto-picual.jpg',
    fallbackImage: './images/caja-mesa-venta.png',
    imageAlt:
      'Botella de vidrio oscuro de Aceite de Oliva Virgen Extra Picual Venta Empedrada de 500 ml sobre piedra caliza junto a rama de olivo.',
    tagline: 'Cosecha temprana · Extracción en frío',
    shortSpec: 'Picual · 500 ml · cosecha temprana · extracción en frío · Almería',
    searchKeywords: 'aceite oliva virgen extra aove picual olivar botella cosecha temprana almeria VE-PIC-2610-A',
    description:
      'Nuestro Picual de cosecha temprana reúne notas de hierba fresca y hoja de olivo, con un amargor y un picor equilibrados. Lo elegimos por su personalidad en crudo: unas gotas bastan para dar el último toque a una tostada, unas verduras asadas o una crema. Un aceite para tener a mano y disfrutar cada día.',
    sensoryProfile: {
      intensidad: 'Frutado verde medio-alto',
      aromas: 'Hierba recién cortada, tomate en rama e higuera',
      enBoca: 'Entrada dulce con amargor y picor limpios y persistentes',
    },
    usageIdeas: [
      'En crudo sobre pan de masa madre recién tostado',
      'Hilo final sobre verduras al horno o cremas templadas',
      'Con tomate de huerta y una pizca de sal en escamas',
    ],
    traceability: {
      lotCode: 'VE-PIC-2610-A',
      parcel: 'Bancales altos del Camino de la Venta (Almería)',
      harvestWindow: 'Finales de octubre · Recolección temprana',
      extraction: 'En frío por debajo de 24 ºC el mismo día de cosecha',
      stewardship: 'Cubierta vegetal espontánea y poda de respeto',
      certificationNote:
        'Propuesta de producción ecológica certificada y seguimiento regenerativo por lote.',
    },
  },
  {
    id: 'miel-romero-500',
    sku: 'VE-MIEL-500',
    categoryKey: 'romeral',
    category: 'Miel Cruda de Floración',
    shortFamily: 'El Romeral',
    name: 'Miel de romero',
    subtitle: 'Una cucharada de dulzor delicado',
    format: '500 g',
    unitMeasureLabel: '500 g | 2,76 € / 100 g',
    containerType: 'Tarro de vidrio con tapa olivo hermética',
    price: 13.8,
    accentToken: 'miel',
    accentColor: '#BE852C',
    badgeTextColor: '#1D2621',
    ctaLabel: 'Añadir la miel',
    image: './images/producto-miel.jpg',
    fallbackImage: './images/caja-mesa-venta.png',
    imageAlt:
      'Tarro de vidrio transparente con 500 g de Miel de Romero Venta Empedrada, tapa verde olivo y franja dorada sobre piedra caliza.',
    tagline: 'Colmenas en lindes florales · Sin filtrar en caliente',
    shortSpec: 'Miel de romero · 500 g · colmenas en la finca · floración por lote',
    searchKeywords: 'miel romero romeral tarro vidrio cruda floracion desayuno yogur VE-MIE-2604-B',
    description:
      'La floración del romero marca el carácter de esta miel: un aroma suave y un dulzor que acompaña sin dominar. Pruébala sobre yogur natural, con queso fresco o en una tostada. Con el tiempo puede cristalizar y cambiar de textura; esa evolución forma parte de la experiencia de una miel que merece disfrutarse despacio.',
    sensoryProfile: {
      intensidad: 'Dulzor fino y persistencia floral media',
      aromas: 'Flor de romero silvestre, cera limpia y notas balsámicas',
      enBoca: 'Textura sedosa con evolución natural hacia grano fino al enfriarse',
    },
    usageIdeas: [
      'Una cucharadita sobre yogur natural entero por la mañana',
      'Acompañando queso fresco o tierno de cabra',
      'En infusión templada o tostada de mantequilla',
    ],
    traceability: {
      lotCode: 'VE-MIE-2604-B',
      parcel: 'Colmenar sur de las lindes de romeral (Almería)',
      harvestWindow: 'Primavera · Primera floración de romero',
      extraction: 'Decantación en frío sin pasteurizar',
      stewardship: 'Márgenes florales permanentes para el pecoreo',
      certificationNote:
        'Caracterización polínica y trazabilidad apícola prevista por lote de colmenar.',
    },
  },
  {
    id: 'almendra-marcona-250',
    sku: 'VE-ALM-250',
    categoryKey: 'almendral',
    category: 'Fruto Seco de Secano',
    shortFamily: 'El Almendral',
    name: 'Almendra Marcona',
    subtitle: 'Abre la bolsa y ponla en el centro',
    format: '250 g',
    unitMeasureLabel: '250 g | 3,96 € / 100 g',
    containerType: 'Bolsa opaca protectora tono caliza con cierre hermético',
    price: 9.9,
    accentToken: 'barro',
    accentColor: '#AB5E43',
    badgeTextColor: '#FFFFFF',
    ctaLabel: 'Añadir las Marconas',
    image: './images/producto-almendra.jpg',
    fallbackImage: './images/caja-mesa-venta.png',
    imageAlt:
      'Bolsa kraft tono caliza de Almendra Marcona natural repelada Venta Empedrada de 250 g con franja barro sobre piedra.',
    tagline: 'Natural y repelada · Sin sal añadida',
    shortSpec: 'Almendra Marcona · 250 g · natural y repelada · sin sal añadida',
    searchKeywords: 'almendra marcona almendral fruto seco repelada sin sal aperitivo ajoblanco VE-MAR-2609-C',
    description:
      'Nuestra Marcona natural y repelada tiene una textura firme y un sabor delicadamente dulce. Se disfruta tal cual, acompañando una conversación, y también en cocina: picada sobre verduras, en un pesto o junto a un queso. La presentamos sin sal añadida, para que puedas elegir cómo servirla.',
    sensoryProfile: {
      intensidad: 'Sabor lácteo limpio y mantecoso natural',
      aromas: 'Fruto seco fresco recién repelado, sin tuestes agresivos',
      enBoca: 'Mordida crujiente y redonda típica de la variedad Marcona',
    },
    usageIdeas: [
      'En un cuenco en el centro de la mesa tal cual o con un hilo de Picual',
      'Picada a cuchillo sobre judías verdes, cremas o ensaladas',
      'Como base de un ajoblanco suave o picada con hierbas',
    ],
    traceability: {
      lotCode: 'VE-MAR-2609-C',
      parcel: 'Terrazas de secano del Almendral Viejo (Almería)',
      harvestWindow: 'Finales de agosto · Secado lento tradicional',
      extraction: 'Repelado suave sin fritura ni sal añadida',
      stewardship: 'Protección de muros de piedra seca y bancales',
      certificationNote:
        'Conservación en bolsa opaca con barrera protectora para preservar frescura.',
    },
  },
];

export const GIFT_BOX = {
  id: 'mesa-de-la-venta',
  sku: 'VE-CAJA-03',
  categoryKey: 'cajas',
  category: 'Colección Completa · Lote',
  shortFamily: 'Edición Regalo',
  name: 'La Mesa de la Venta',
  subtitle: 'Una finca para compartir',
  format: '500 ml + 500 g + 250 g',
  unitMeasureLabel: '3 productos | Ahorro 1,70 € frente a suelto',
  price: 38.5,
  individualTotal: 40.2,
  giftWrapPrice: 3.5,
  accentColor: '#293D32',
  ctaLabel: 'Añadir caja completa',
  image: './images/caja-mesa-venta.png',
  fallbackImage: './images/caja-mesa-venta.png',
  imageAlt:
    'Colección completa La Mesa de la Venta: botella AOVE Picual 500 ml, tarro de miel de romero 500 g, bolsa de almendra Marcona 250 g y caja de cartón con separadores protectores.',
  tagline: 'Caja con separadores protectores y tarjeta de bienvenida',
  searchKeywords: 'caja regalo la mesa de la venta lote completo estuche dedicatoria compartir',
  description:
    'Un Picual con carácter, una miel de romero delicada y unas Marconas para servir en el centro. La Mesa de la Venta reúne los tres productos de nuestra finca en una colección pensada para disfrutar juntos. Para un anfitrión, una visita especial o tu propia despensa.',
  contents: [
    { label: '1 × AOVE Picual', detail: 'Botella oscura · 500 ml', accent: '#293D32' },
    { label: '1 × Miel de romero', detail: 'Tarro de vidrio · 500 g', accent: '#BE852C' },
    { label: '1 × Almendra Marcona', detail: 'Natural repelada · 250 g', accent: '#AB5E43' },
    {
      label: 'Tarjeta de bienvenida',
      detail: 'Con tres ideas de consumo e historia del lote',
      accent: '#293D32',
    },
  ],
  welcomeCardText:
    'Bienvenido a la mesa de la venta. Abre el aceite, sirve unas almendras y deja la miel cerca del desayuno. Esta caja reúne tres maneras de conocer nuestra finca. En cada producto encontrarás su origen y una idea para disfrutarlo. Gracias por hacernos un sitio en tu mesa.',
  backLabelText:
    'De los bancales de Venta Empedrada a tu despensa. Cuidamos el origen y elegimos cada lote por su sabor. Conoce su cosecha, sus características y a quienes lo producen en la ficha de este producto.',
};

export const CATALOG_CATEGORIES = [
  { id: 'todos', label: 'Toda la despensa', navLabel: 'Toda la despensa', count: 4 },
  { id: 'olivar', label: 'Aceites · El Olivar', navLabel: 'Aceites', count: 1, accent: '#293D32' },
  { id: 'romeral', label: 'Mieles · El Romeral', navLabel: 'Mieles', count: 1, accent: '#BE852C' },
  {
    id: 'almendral',
    label: 'Almendra Marcona',
    navLabel: 'Frutos secos',
    count: 1,
    accent: '#AB5E43',
  },
  { id: 'cajas', label: 'Cajas Regalo', navLabel: 'Cajas Regalo', count: 1, accent: '#293D32' },
];

export const CATALOG_ITEMS = [...PRODUCTS, GIFT_BOX];

