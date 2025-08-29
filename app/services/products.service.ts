import type { ApiResponse, LocalizedPartial } from '~/modules/api/types'
export interface ProductCategory {
  id: number
  title_en: string
  title_ar: string
}

export interface IntegratedPivot {
  item_id: number
  integrated_item_id: number
}
export interface IntegratedItem {
  id: number
  title_en: string
  title_ar: string
  slug: string
  image: string
  image_url: string
  pivot: IntegratedPivot
}

export interface SectionContent {
  id: number
  item_section_id: number
  content_en: string
  content_ar: string
  cta_text_en: string | null
  cta_text_ar: string | null
  cta_link: string | null
  created_at: string
  updated_at: string
}
export interface ItemSection {
  id: number
  item_id: number
  title_en: string | null
  title_ar: string | null
  type: string
  order: number
  created_at: string
  updated_at: string
  content: SectionContent
}

export interface Product
  extends LocalizedPartial<
    'title' | 'description' | 'meta_title' | 'meta_desc' | 'meta_description' | 'meta_keywords'
  > {
  id: number
  category_id: number
  image: string
  cover_image: string
  document: string
  slug: string
  status: number
  created_at: string
  updated_at: string

  integrated_items: IntegratedItem[]
  category: ProductCategory
  item_sections: ItemSection[]
}
export async function getProductDetails(slug: string) {
  const { apiFetch } = useApi()
  const res = await apiFetch<ApiResponse<Product>>(`/website/home/item/${slug}`)
  return res.data ?? null
}
