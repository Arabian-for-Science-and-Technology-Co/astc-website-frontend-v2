import productImage1 from '~/assets/Images/main/products_cards/product_1.png?url'
import productImage2 from '~/assets/Images/main/products_cards/product_2.png?url'
import productImage3 from '~/assets/Images/main/products_cards/product_3.png?url'
import productImage4 from '~/assets/Images/main/products_cards/product_4.png?url'

export const res = {
  message: 'messages.success',
  status: 200,
  data: {
    id: 1,
    category_id: 1,
    title_en: 'RAAD SuperApp',
    title_ar: 'منصة رعد للتواصل المؤسسي',
    image: 'http://127.0.0.1:8000/storage/items/raad.png',
    cover_image: 'http://127.0.0.1:8000/storage/items/cover-image12.jpg',
    meta_title_en: 'RAAD SuperApp',
    meta_title_ar: 'منصة رعد للتواصل المؤسسي',
    meta_desc_en: 'Innovative cost-effective and advanced environmental treatment',
    meta_desc_ar: 'معالجة بيئية مبتكرة وفعالة من حيث التكلفة ومتقدمة تقنيًا',
    document: 'http://127.0.0.1:8000/storage/items/sample.pdf',
    slug: 'raad-superapp-1',
    status: 1,
    created_at: '2025-08-21T12:13:38.000000Z',
    updated_at: '2025-08-21T12:13:38.000000Z',
    integrated_items: [
      {
        id: 2,
        title_en: 'Smart Fiber Optics',
        title_ar: 'الألياف البصرية الذكية',
        slug: 'smart-fiber-optics-2',
        image: 'http://127.0.0.1:8000/storage/items/fiber-optics.png',
        pivot: {
          item_id: 1,
          integrated_item_id: 2
        }
      },
      {
        id: 5,
        title_en: 'Digital Twin',
        title_ar: 'التوأم الرقمي',
        slug: 'digital-twin-5',
        image: 'http://127.0.0.1:8000/storage/items/digital-twin.png',
        pivot: {
          item_id: 1,
          integrated_item_id: 5
        }
      },
      {
        id: 6,
        title_en: 'Computer Vision',
        title_ar: 'الرؤية الحاسوبية',
        slug: 'computer-vision-6',
        image: 'http://127.0.0.1:8000/storage/items/computer-vision.png',
        pivot: {
          item_id: 1,
          integrated_item_id: 6
        }
      }
    ],
    category: {
      id: 1,
      title_en: 'Products',
      title_ar: 'منتجات'
    },
    item_sections: [
      {
        id: 1,
        item_id: 1,
        title_en:
          'Our investment idea — private equity fund focused on technology-driven industries.',
        title_ar: 'فكرتنا الاستثمارية - صندوق أسهم خاصة يركز على الصناعات القائمة على التكنولوجيا.',
        type: 'paragraph',
        order: 0,
        created_at: '2025-08-21T12:13:38.000000Z',
        updated_at: '2025-08-21T12:13:38.000000Z',
        content: {
          id: 1,
          item_section_id: 1,
          content_en:
            '<p><strong>Head 2</strong></p><p>Like Hari Seldon, we predicted the future. We saw that mobile was becoming more popular — and more important. We knew we had to have something more functional and fluid to work on different screens, different orientations. That the framework had to be responsive was a no-brainer. And we were the first open-source framework to be responsive. We were also the first semantic framework and the first to be Mobile First. When Foundation 5 came out, we were also be the first to include Sass partials.</p><p>Throught the years, Foundation has grown a dedicated community of designers and developers. Along with that, our mascot, the Yeti has also changed. We continue to explore uncharted territories to ensure Foundation remains the most advanced responsive front-end framework in the world … and beyond!</p>',
          content_ar:
            '<h2 class="ql-align-right"><br></h2><p class="ql-align-right"><strong>رئيس 2</strong></p><p class="ql-align-right">مثل هاري سيلدون، تنبأنا بالمستقبل. رأينا أن الهاتف المحمول أصبح أكثر شعبية - وأكثر أهمية. كنا نعلم أنه كان علينا أن يكون لدينا شيء أكثر فاعلية وسلاسة للعمل على شاشات مختلفة واتجاهات مختلفة. كان من البديهي أن يكون إطار العمل سريع الاستجابة. وكنا أول إطار عمل مفتوح المصدر يستجيب. وكنا أيضًا أول إطار عمل دلالي وأول إطار عمل يعتمد على الجوال أولًا. عندما صدر فاونديشن 5، كنا أيضًا أول من أدرجنا أجزاء Sass.</p><p class="ql-align-right">على مر السنين، نمت فاونديشن على مر السنين مجتمعًا مخصصًا من المصممين والمطورين. إلى جانب ذلك، تغيرت تعويذتنا، اليتي أيضًا. نحن نواصل استكشاف مناطق مجهولة لضمان بقاء فاونديشن إطار عمل الواجهة الأمامية الأكثر تقدمًا واستجابة في العالم... وما بعدها!</p>',
          cta_text_en: null,
          cta_text_ar: null,
          cta_link: null,
          created_at: '2025-08-21T12:13:38.000000Z',
          updated_at: '2025-08-21T12:13:38.000000Z'
        }
      },
      {
        id: 2,
        item_id: 1,
        title_en: null,
        title_ar: null,
        type: 'image',
        order: 10,
        created_at: '2025-08-21T12:13:38.000000Z',
        updated_at: '2025-08-21T12:13:38.000000Z',
        content: [
          {
            id: 1,
            item_section_id: 2,
            title_en: null,
            title_ar: null,
            type: 'slider',
            image_url: productImage1,
            created_at: '2025-08-21T12:13:38.000000Z',
            updated_at: '2025-08-21T12:13:38.000000Z'
          },
          {
            id: 2,
            item_section_id: 2,
            title_en: null,
            title_ar: null,
            type: 'slider',
            image_url: productImage2,
            created_at: '2025-08-21T12:13:38.000000Z',
            updated_at: '2025-08-21T12:13:38.000000Z'
          },
          {
            id: 3,
            item_section_id: 2,
            title_en: null,
            title_ar: null,
            type: 'slider',
            image_url: productImage3,
            created_at: '2025-08-21T12:13:38.000000Z',
            updated_at: '2025-08-21T12:13:38.000000Z'
          }
        ]
      },
      {
        id: 3,
        item_id: 1,
        title_en: null,
        title_ar: null,
        type: 'paragraph',
        order: 1,
        created_at: '2025-08-21T12:13:38.000000Z',
        updated_at: '2025-08-21T12:13:38.000000Z',
        content: {
          id: 2,
          item_section_id: 3,
          content_en:
            '<p>Like Hari Seldon, we predicted the future. We saw that mobile was becoming more popular — and more important. We knew we had to have something more functional and fluid to work on different screens, different orientations. That the framework had to be responsive was a no-brainer. And we were the first open-source framework to be responsive. We were also the first semantic framework and the first to be Mobile First. When Foundation 5 came out, we were also be the first to include Sass partials.</p><p><br></p><p>Throught the years, Foundation has grown a dedicated community of designers and developers. Along with that, our mascot, the Yeti has also changed. We continue to explore uncharted territories to ensure Foundation remains the most advanced responsive front-end framework in the world … and beyond!</p>',
          content_ar:
            '<p class="ql-align-right">مثل هاري سيلدون، تنبأنا بالمستقبل. رأينا أن الهاتف المحمول أصبح أكثر شعبية - وأكثر أهمية. كنا نعلم أنه كان علينا أن يكون لدينا شيء أكثر فاعلية وسلاسة للعمل على شاشات مختلفة واتجاهات مختلفة. كان من البديهي أن يكون إطار العمل سريع الاستجابة. وكنا أول إطار عمل مفتوح المصدر يستجيب. وكنا أيضًا أول إطار عمل دلالي وأول إطار عمل يعتمد على الجوال أولًا. عندما صدر فاونديشن 5، كنا أيضًا أول من أدرجنا أجزاء Sass.</p><p class="ql-align-right"><br></p><p class="ql-align-right">على مر السنين، نمت فاونديشن على مر السنين مجتمعًا مخصصًا من المصممين والمطورين. إلى جانب ذلك، تغيرت تعويذتنا، اليتي أيضًا. نحن نواصل استكشاف مناطق مجهولة لضمان بقاء فاونديشن إطار عمل الواجهة الأمامية الأكثر تقدمًا واستجابة في العالم... وما بعدها!</p>',
          cta_text_en: 'Let’s Talk',
          cta_text_ar: 'لنتحدث',
          cta_link: 'not yet',
          created_at: '2025-08-21T12:13:38.000000Z',
          updated_at: '2025-08-21T12:13:38.000000Z'
        }
      }
    ]
  }
}
