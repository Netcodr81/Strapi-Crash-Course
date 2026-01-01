import type { Schema, Struct } from '@strapi/strapi';

export interface AboutAbout extends Struct.ComponentSchema {
  collectionName: 'components_about_abouts';
  info: {
    displayName: 'about';
  };
  attributes: {
    aboutPhoto: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    aboutText: Schema.Attribute.String;
  };
}

export interface HeroHero extends Struct.ComponentSchema {
  collectionName: 'components_hero_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    heroDescription: Schema.Attribute.String;
    heroText: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.about': AboutAbout;
      'hero.hero': HeroHero;
    }
  }
}
