// lib/directus.js
import {
  createDirectus,
  rest,
  readItems,
  readItem,
  createItem,
} from '@directus/sdk';

export const directus = createDirectus(
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
).with(rest());

// Utility functions
export const directusUtils = {
  // Get full asset URL
  getAssetUrl(assetId, transform) {
    const baseUrl =
      process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
    const transformParam = transform ? `?${transform}` : '';
    return `${baseUrl}/assets/${assetId}${transformParam}`;
  },

  // Get optimized image URL with transformations
  getOptimizedImageUrl(assetId, options = {}) {
    const params = new URLSearchParams();

    if (options.width) params.append('width', options.width.toString());
    if (options.height) params.append('height', options.height.toString());
    if (options.quality) params.append('quality', options.quality.toString());
    if (options.format) params.append('format', options.format);
    if (options.fit) params.append('fit', options.fit);

    return this.getAssetUrl(assetId, params.toString());
  },

  // Get thumbnail URL
  getThumbnailUrl(assetId, size = 300) {
    return this.getOptimizedImageUrl(assetId, {
      width: size,
      height: size,
      fit: 'cover',
      format: 'webp',
      quality: 80,
    });
  },

  async getHomePage() {
    try {
      const page = await directus.request(
        readItems('pages', {
          filter: {
            permalink: { _eq: `/` },
          },
          fields: [
            '*',
            'seo.*',
            'title',
            'permalink',
            'heading',
            'width',
            'blocks.id',
            'blocks.collection',
            'blocks.item.*',
            'blocks.item.button_group.*',
            'blocks.item.button_group.buttons.*',
            'blocks.item.card_group.*',
            'blocks.item.card_group.cards.*',
          ],
          limit: 1,
        }),
      );
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },

  async getPageWithSEO(slug) {
    try {
      const page = await directus.request(
        readItems('pages', {
          filter: {
            permalink: { _eq: `/${slug}` },
            status: { _eq: 'published' },
          },
          fields: [
            '*',
            'seo.*',
            'title',
            'permalink',
            'heading',
            'width',
            'blocks.id',
            'blocks.collection',
            'blocks.item.*',
            'blocks.item.button_group.*',
            'blocks.item.button_group.buttons.*',
            'blocks.item.card_group.*',
            'blocks.item.card_group.cards.*',
          ],
          limit: 1,
        }),
      );
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },
  async getNavigationbyID(id) {
    try {
      const navigation = await directus.request(
        readItems('navigation', {
          filter: {
            id: { _eq: id },
          },
        }),
      );

      // Then, get the related navigation_items
      const navigationItems = await directus.request(
        readItems('navigation_items', {
          filter: {
            navigation: { _eq: id }, // assuming navigation_items has a navigation_id field
          },
          sort: ['sort', 'id'], // optional: sort by sort field or id
        }),
      );

      // Combine the results
      return {
        ...navigation[0],
        items: navigationItems,
      };
    } catch (error) {
      console.error('Error fetching navigation:', error);
      return null;
    }
  },
};
