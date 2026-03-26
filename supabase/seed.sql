insert into demos (title, category, slug, demo_url, preview_image, base_price, short_description, is_active)
values
('Avukatlik Kurumsal V1', 'avukat', 'avukatlik-kurumsal-v1', 'https://example.com/demo-law-1', null, 12000, 'Hukuk ofisleri icin guven odakli sade tasarim.', true),
('Avukatlik Premium V2', 'avukat', 'avukatlik-premium-v2', 'https://example.com/demo-law-2', null, 14500, 'Daha premium sunum ve net iletisim bloklari.', true),
('Emlak Portfoy Pro V1', 'emlak', 'emlak-portfoy-pro-v1', 'https://example.com/demo-realty-1', null, 15000, 'Portfoy odakli emlak satis sayfasi.', true),
('Emlak Villa Showcase V2', 'emlak', 'emlak-villa-showcase-v2', 'https://example.com/demo-realty-2', null, 16500, 'Luks konut portfoyleri icin premium duzen.', true),
('Emlak Yatirim Landing V3', 'emlak', 'emlak-yatirim-landing-v3', 'https://example.com/demo-realty-3', null, 17250, 'Yatirim odakli ilan ve geri donusum kurgusu.', true),
('Emlak Kurumsal Plus V4', 'emlak', 'emlak-kurumsal-plus-v4', 'https://example.com/demo-realty-4', null, 18000, 'Kurumsal emlak markalari icin temiz vitrin.', true),
('Fotografci Storyline V1', 'fotografci', 'fotografci-storyline-v1', 'https://example.com/demo-photo-1', null, 10000, 'Portfolyo vitrinini one cikaran modern yapi.', true),
('Fotografci Wedding Film V2', 'fotografci', 'fotografci-wedding-film-v2', 'https://example.com/demo-photo-2', null, 11600, 'Hikaye anlatimi odakli cekim sunumu.', true),
('Dis Klinigi Modern V1', 'dis-klinigi', 'dis-klinigi-modern-v1', 'https://example.com/demo-dental-1', null, 14000, 'Klinikler icin modern ve temiz sunum deneyimi.', true),
('Dis Klinigi Randevu V2', 'dis-klinigi', 'dis-klinigi-randevu-v2', 'https://example.com/demo-dental-2', null, 15200, 'Randevu odakli donusum tasarimi.', true),
('Guzellik Salonu Glow V1', 'guzellik-salonu', 'guzellik-salonu-glow-v1', 'https://example.com/demo-beauty-1', null, 11250, 'Hizmet odakli salon tanitim sayfasi.', true),
('Guzellik Salonu Booking V2', 'guzellik-salonu', 'guzellik-salonu-booking-v2', 'https://example.com/demo-beauty-2', null, 12500, 'Online randevuya yonlendiren sade duzen.', true),
('Insaat Kurumsal V1', 'insaat', 'insaat-kurumsal-v1', 'https://example.com/demo-construction-1', null, 18500, 'Insaat firmalari icin guven veren kurumsal cizgi.', true),
('Insaat Proje Portfoy V2', 'insaat', 'insaat-proje-portfoy-v2', 'https://example.com/demo-construction-2', null, 19800, 'Tamamlanan projeleri one cikaran vitrin.', true),
('Danismanlik Executive V1', 'danismanlik', 'danismanlik-executive-v1', 'https://example.com/demo-consulting-1', null, 16000, 'B2B hizmet satisi icin ikna odakli yapi.', true),
('Danismanlik Premium V2', 'danismanlik', 'danismanlik-premium-v2', 'https://example.com/demo-consulting-2', null, 17500, 'Premium hizmet sunumu icin temiz tasarim.', true),
('Kafe Bistro Landing V1', 'kafe', 'kafe-bistro-landing-v1', 'https://example.com/demo-cafe-1', null, 9800, 'Mekan atmosferini one cikaran restoran sayfasi.', true),
('Restoran Menu Pro V2', 'restoran', 'restoran-menu-pro-v2', 'https://example.com/demo-restaurant-1', null, 11800, 'Online menu ve rezervasyon odakli akis.', true),
('Spor Salonu Membership V1', 'spor-salonu', 'spor-salonu-membership-v1', 'https://example.com/demo-gym-1', null, 10800, 'Uyelik donusumunu artiran fitness sayfasi.', true),
('Yazilim Ajansi SaaS V1', 'yazilim-ajansi', 'yazilim-ajansi-saas-v1', 'https://example.com/demo-software-1', null, 21000, 'Ajanslar icin premium B2B teklif vitrini.', true)
on conflict (slug) do nothing;

