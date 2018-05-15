const categories = [
  {
    _id: '5a78c4169d3f2c2bc96c4205',
    name: 'Pizzas',
    slug: 'pizzas'
  },
  {
    _id: '5a78c4169d3f2c2bc96c4206',
    name: 'Soups',
    slug: 'soups'
  },
  {
    _id: '5a78c4169d3f2c2bc96c4207',
    name: 'Salads',
    slug: 'salads'
  }
]

/*
 * MenuItems: Pizzas, Soups, Salads
 */
const pizzas = [
  {
    name: 'Mario',
    description: 'Blat subțire. Sos de roșii, busuioc, ulei de măsline, maioneză, brânză Mozzarella, carne de pui, cașcaval Dor Blue, spanac, cârnăciori Cabanos, gogoșari.',
    prices: [
      {
        name: 'Small',
        price: 80
      }
    ],
    weight: 500,
    featuredImage: 'mario.jpg',
    category: '5a78c4169d3f2c2bc96c4205',

    optionGroups: [
      {
        name: 'Cascaval',
        multiselect: true,
        options: [
          {
            name: 'Cașcaval Edam 50g',
            prices: [10]
          },
          {
            name: 'Mozzarella 50g',
            prices: [10]
          },
          {
            name: 'Parmigiano 15g',
            prices: [10]
          }
        ]
      },
      {
        name: 'Carne',
        multiselect: true,
        options: [
          {
            name: 'Jambon de Tambov 50g',
            prices: [15]
          },
          {
            name: 'Piept de pui 50g',
            prices: [10]
          },
          {
            name: 'Salami 30g',
            prices: [20]
          }
        ]
      }
    ]
  },
  {
    name: 'Siciliana',
    description: 'Brânză mozzarella, jambon de “tambov”, ciuperci coapte, anghinare coapte, măsline kalamata, sos de pizza.',
    prices: [
      {
        name: 'Small',
        price: 50
      },
      {
        name: 'Medium',
        price: 80
      },
      {
        name: 'Big',
        price: 100
      }
    ],
    weight: 520,
    featuredImage: 'sicilian.jpg',
    category: '5a78c4169d3f2c2bc96c4205',

    optionGroups: [
      {
        name: 'Cascaval',
        multiselect: true,
        options: [
          {
            name: 'Cașcaval Edam 50g',
            prices: [10, 15, 20]
          },
          {
            name: 'Mozzarella 50g',
            prices: [5, 8, 10]
          },
          {
            name: 'Parmigiano 15g',
            prices: [5]
          }
        ]
      },
      {
        name: 'Carne',
        multiselect: false,
        options: [
          {
            name: 'Jambon de Tambov 50g',
            prices: [15]
          },
          {
            name: 'Piept de pui 50g',
            prices: [20, 30, 40]
          },
          {
            name: 'Salami 30g',
            prices: [20]
          }
        ]
      }
    ]
  }
]

const soups = [
  {
    name: 'Zeamă de pui',
    description: 'Bulion de pui, file de pui, verdeaţă, roşii, tăiţei de casă, ardei gras, rădăcină de țelină, pătrunjel, smântână, ardei iute.',
    prices: [{ name: '', price: 45 }],
    weight: 460,
    featuredImage: 'zeama.jpg',
    category: '5a78c4169d3f2c2bc96c4206'
  },
  {
    name: 'Supă-cremă de pui',
    description: 'Bulion de pui, pulpă de pui, ciuperci champignon, sos bechamel, smântână lichidă, ulei de măsline, piper negru, pătrunjel. Se serveşte în chiflă.',
    prices: [{ name: '', price: 53 }],
    weight: 430,
    featuredImage: 'supa.jpg',
    category: '5a78c4169d3f2c2bc96c4206'
  },
  {
    name: 'Supă-cremă de fasole',
    description: 'Bulion de legume, fasole, usturoi, pesmeți, ceapă verde, piper negru, ulei de măsline.',
    prices: [{ name: '', price: 40 }],
    weight: 350,
    featuredImage: 'supa.jpg',
    category: '5a78c4169d3f2c2bc96c4206',

    optionGroups: [
      {
        name: 'Temperatura',
        multiselect: false,
        options: [
          {
            name: 'Rece',
            prices: [0]
          },
          {
            name: 'Calda',
            prices: [1]
          }
        ]
      }
    ]
  }
]

/*
 * Merge MenuItems from all categories.
 */
const menuItems = [
  ...pizzas,
  ...soups
]

module.exports = {
  menuItems,
  categories
}