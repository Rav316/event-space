--liquibase formatted sql

--changeset codex:1
INSERT INTO users (
    first_name, last_name, email, password, role, course, description, phone,
    avatar_url, tg_username, vk_url, github_url, is_active, register_date, faculty_id, new_event_notifications
)
VALUES
    ('Илья', 'Смирнов', 'org1@eventspace.local', '{noop}pass', 'ORGANIZER', 4, 'Организатор IT-мероприятий', '+79000000001', 'https://i.pravatar.cc/300?img=11', 'ilya_space', 'https://vk.com/ilya_space', 'https://github.com/ilya-space', true, DATE '2025-09-05', 1, true),
    ('Марина', 'Кузнецова', 'org2@eventspace.local', '{noop}pass', 'ORGANIZER', 3, 'Координация культурных событий', '+79000000002', 'https://i.pravatar.cc/300?img=5', 'marina_events', 'https://vk.com/marina_events', 'https://github.com/marina-events', true, DATE '2025-09-09', 4, true),
    ('Денис', 'Фролов', 'org3@eventspace.local', '{noop}pass', 'ORGANIZER', 4, 'Куратор спортивных активностей', '+79000000003', 'https://i.pravatar.cc/300?img=15', 'den_frolov', 'https://vk.com/den_frolov', 'https://github.com/den-frolov', true, DATE '2025-09-14', 5, true),
    ('Софья', 'Орлова', 'org4@eventspace.local', '{noop}pass', 'ORGANIZER', 2, 'Развитие образовательного трека', '+79000000004', 'https://i.pravatar.cc/300?img=20', 'sofia_orlova', 'https://vk.com/sofia_orlova', 'https://github.com/sofia-orlova', true, DATE '2025-10-01', 3, true),
    ('Артем', 'Егоров', 'org5@eventspace.local', '{noop}pass', 'ORGANIZER', 4, 'Open Source и инженерные митапы', '+79000000005', 'https://i.pravatar.cc/300?img=22', 'artem_egorov', 'https://vk.com/artem_egorov', 'https://github.com/artem-egorov', true, DATE '2025-10-10', 1, true),
    ('Екатерина', 'Морозова', 'org6@eventspace.local', '{noop}pass', 'ORGANIZER', 3, 'Карьера и стажировки', '+79000000006', 'https://i.pravatar.cc/300?img=24', 'ek_morozova', 'https://vk.com/ek_morozova', 'https://github.com/ek-morozova', true, DATE '2025-10-20', 6, true),
    ('Павел', 'Волков', 'org7@eventspace.local', '{noop}pass', 'ORGANIZER', 4, 'Стартап-мероприятия и демо-дни', '+79000000007', 'https://i.pravatar.cc/300?img=33', 'pavel_volkov', 'https://vk.com/pavel_volkov', 'https://github.com/pavel-volkov', true, DATE '2025-11-01', 6, true),
    ('Наталья', 'Белова', 'org8@eventspace.local', '{noop}pass', 'ORGANIZER', 2, 'Клубы и внеучебные форматы', '+79000000008', 'https://i.pravatar.cc/300?img=47', 'nat_belova', 'https://vk.com/nat_belova', 'https://github.com/nat-belova', true, DATE '2025-11-12', 9, true),
    ('Роман', 'Козлов', 'org9@eventspace.local', '{noop}pass', 'ORGANIZER', 4, 'Технические интенсивы', '+79000000009', 'https://i.pravatar.cc/300?img=51', 'roman_kozlov', 'https://vk.com/roman_kozlov', 'https://github.com/roman-kozlov', true, DATE '2025-11-20', 2, true),
    ('Алина', 'Соколова', 'org10@eventspace.local', '{noop}pass', 'ORGANIZER', 3, 'Комьюнити и нетворкинг', '+79000000010', 'https://i.pravatar.cc/300?img=60', 'alina_sokolova', 'https://vk.com/alina_sokolova', 'https://github.com/alina-sokolova', true, DATE '2025-12-02', 8, true),

    ('Олег', 'Жуков', 'verifier1@eventspace.local', '{noop}pass', 'VERIFIER', 4, 'Проверка посещаемости на площадках', '+79000000021', 'https://i.pravatar.cc/300?img=68', 'oleg_verify', 'https://vk.com/oleg_verify', 'https://github.com/oleg-verify', true, DATE '2025-10-05', 2, false),
    ('Лилия', 'Рыбакова', 'verifier2@eventspace.local', '{noop}pass', 'VERIFIER', 3, 'Верификация участников и контроль доступа', '+79000000022', 'https://i.pravatar.cc/300?img=71', 'liliya_verify', 'https://vk.com/liliya_verify', 'https://github.com/liliya-verify', true, DATE '2025-10-08', 7, false),
    ('Глеб', 'Макаров', 'verifier3@eventspace.local', '{noop}pass', 'VERIFIER', 4, 'Подтверждение attendance через QR', '+79000000023', 'https://i.pravatar.cc/300?img=72', 'gleb_verify', 'https://vk.com/gleb_verify', 'https://github.com/gleb-verify', true, DATE '2025-10-12', 1, false)
ON CONFLICT (email) DO NOTHING;

--changeset codex:2
WITH first_names AS (
    SELECT ARRAY[
        'Алексей','Виктория','Михаил','Анастасия','Кирилл','Дарья','Никита','Полина','Егор','Елизавета',
        'Иван','Ксения','Максим','Ольга','Тимур','Валерия','Сергей','Мария','Антон','Яна'
    ] AS arr
),
last_names AS (
    SELECT ARRAY[
        'Иванов','Петрова','Сидоров','Новикова','Павлов','Семенова','Назаров','Комарова','Титов','Лебедева',
        'Громов','Федорова','Крылов','Королева','Блинов','Акимова','Дорофеев','Мельникова','Гаврилов','Тарасова'
    ] AS arr
),
seed AS (
    SELECT
        gs AS n,
        fn.arr[1 + ((gs - 1) % array_length(fn.arr, 1))] AS first_name,
        ln.arr[1 + ((gs + 3) % array_length(ln.arr, 1))] AS last_name
    FROM generate_series(1, 48) gs
    CROSS JOIN first_names fn
    CROSS JOIN last_names ln
)
INSERT INTO users (
    first_name, last_name, email, password, role, course, description, phone,
    avatar_url, tg_username, vk_url, github_url, is_active, register_date, faculty_id, new_event_notifications
)
SELECT
    s.first_name,
    s.last_name,
    'user' || lpad(s.n::text, 2, '0') || '@eventspace.local',
    '{noop}pass',
    'PARTICIPANT',
    ((s.n - 1) % 4 + 1)::smallint,
    format('Активный участник №%s', s.n),
    '+7901000' || lpad(s.n::text, 4, '0'),
    format('https://i.pravatar.cc/300?img=%s', (80 + s.n)),
    'es_user_' || lpad(s.n::text, 2, '0'),
    'https://vk.com/es_user_' || lpad(s.n::text, 2, '0'),
    'https://github.com/es-user-' || lpad(s.n::text, 2, '0'),
    CASE WHEN s.n IN (12, 27, 44) THEN false ELSE true END,
    DATE '2025-09-01' + ((s.n * 3) % 170),
    ((s.n - 1) % 10 + 1),
    (s.n % 3 = 0)
FROM seed s
ON CONFLICT (email) DO NOTHING;

--changeset codex:3
INSERT INTO event (
    name, tags, event_date, start_time, end_time, space_id,
    description, image_url, event_category_id, short_description, deadline, author
)
SELECT
    v.name,
    v.tags,
    v.event_date,
    v.start_time,
    v.end_time,
    s.id,
    v.description,
    v.image_url,
    c.id,
    v.short_description,
    v.deadline,
    u.id
FROM (
    VALUES
    ('Data Science Meetup: Spring Cases', ARRAY['data','analytics','career']::text[], DATE '2025-11-14', TIME '18:00', TIME '20:30', 'Компьютерный класс 1', 'Практический разбор кейсов по аналитике данных и обсуждение карьерных треков.', 'https://picsum.photos/seed/es-event-01/1200/630', 'IT-секции', 'Разбор кейсов по аналитике и обмен опытом.', DATE '2025-11-11', 'org1@eventspace.local'),
    ('Ночь кино в кампусе', ARRAY['кино','культура','кампус']::text[], DATE '2025-11-28', TIME '19:00', TIME '22:00', 'Актовый зал 1', 'Вечер короткометражного кино с обсуждением и голосованием за лучший фильм.', 'https://picsum.photos/seed/es-event-02/1200/630', 'Культурные', 'Киновечер с обсуждением и зрительским голосованием.', DATE '2025-11-25', 'org2@eventspace.local'),
    ('Хакатон первокурсников', ARRAY['hackathon','it','teamwork']::text[], DATE '2025-12-12', TIME '10:00', TIME '18:00', 'Коворкинг', 'Командный хакатон для первокурсников: MVP за один день и финальные питчи.', 'https://picsum.photos/seed/es-event-03/1200/630', 'IT-секции', 'Первый хакатон для новых студентов с защитой проектов.', DATE '2025-12-08', 'org5@eventspace.local'),
    ('Зимний турнир по волейболу', ARRAY['sport','volleyball','winter']::text[], DATE '2025-12-20', TIME '12:00', TIME '16:00', 'Спортзал', 'Командный турнир между факультетами, сетка плей-офф и награждение.', 'https://picsum.photos/seed/es-event-04/1200/630', 'Спортивные', 'Турнир факультетов по волейболу.', DATE '2025-12-16', 'org3@eventspace.local'),
    ('Карьерная лекция QA в продукте', ARRAY['career','qa','product']::text[], DATE '2026-01-15', TIME '17:30', TIME '19:30', 'Аудитория 201', 'Практикующий QA-лид делится опытом роста от стажера до руководителя команды.', 'https://picsum.photos/seed/es-event-05/1200/630', 'Учебные', 'Лекция о карьерном треке QA и навыках роста.', DATE '2026-01-12', 'org6@eventspace.local'),
    ('Мастерская публичных выступлений', ARRAY['soft-skills','speaking','practice']::text[], DATE '2026-01-22', TIME '18:00', TIME '20:00', 'Кабинет 201', 'Тренировка структуры доклада, голоса и работы с вопросами аудитории.', 'https://picsum.photos/seed/es-event-06/1200/630', 'Учебные', 'Практика публичных выступлений с тренером.', DATE '2026-01-19', 'org4@eventspace.local'),
    ('Разбор pet-проектов', ARRAY['it','portfolio','code-review']::text[], DATE '2026-01-29', TIME '18:30', TIME '21:00', 'Компьютерный класс 2', 'Открытый разбор студенческих pet-проектов: архитектура, кодстайл, roadmap.', 'https://picsum.photos/seed/es-event-07/1200/630', 'IT-секции', 'Код-ревью и советы по развитию pet-проектов.', DATE '2026-01-26', 'org9@eventspace.local'),
    ('День донора', ARRAY['social','health','volunteer']::text[], DATE '2026-02-03', TIME '11:00', TIME '15:00', 'Холл 2', 'Социальная акция с консультациями и регистрацией доноров крови.', 'https://picsum.photos/seed/es-event-08/1200/630', 'Социальные', 'Добровольческая акция донорства в кампусе.', DATE '2026-01-30', 'org8@eventspace.local'),
    ('AI Reading Club #12', ARRAY['ai','ml','reading-club']::text[], DATE '2026-02-06', TIME '19:00', TIME '21:00', 'Кабинет 102', 'Обсуждение научной статьи про retrieval-augmented generation и практических выводов.', 'https://picsum.photos/seed/es-event-09/1200/630', 'IT-секции', 'Разбор AI-статьи и прикладных выводов.', DATE '2026-02-04', 'org1@eventspace.local'),
    ('Квиз по истории науки', ARRAY['quiz','science','team']::text[], DATE '2026-02-10', TIME '18:00', TIME '20:30', 'Кафе 2', 'Командный квиз с раундами по физике, химии, биологии и истории открытий.', 'https://picsum.photos/seed/es-event-10/1200/630', 'Культурные', 'Командный научный квиз в неформальном формате.', DATE '2026-02-07', 'org2@eventspace.local'),
    ('Workshop: Docker для начинающих', ARRAY['docker','devops','infra']::text[], DATE '2026-02-14', TIME '16:00', TIME '19:00', 'Лаборатория физики', 'Пошаговая практика по контейнеризации сервисов и работе с docker-compose.', 'https://picsum.photos/seed/es-event-11/1200/630', 'IT-секции', 'Практикум по Docker и базовой инфраструктуре.', DATE '2026-02-11', 'org9@eventspace.local'),
    ('Открытый микрофон', ARRAY['music','culture','community']::text[], DATE '2026-02-18', TIME '18:30', TIME '21:00', 'Кафе', 'Музыкальные и поэтические выступления студентов в камерной обстановке.', 'https://picsum.photos/seed/es-event-12/1200/630', 'Культурные', 'Вечер живых выступлений и авторских текстов.', DATE '2026-02-15', 'org8@eventspace.local'),
    ('Клуб настольных игр', ARRAY['board-games','community','fun']::text[], DATE '2026-02-21', TIME '15:00', TIME '19:00', 'Холл', 'Большая встреча клуба настольных игр с тематическими столами и мини-турнирами.', 'https://picsum.photos/seed/es-event-13/1200/630', 'Культурные', 'Настольные игры, мини-турниры и живое общение.', DATE '2026-02-18', 'org10@eventspace.local'),
    ('DevOps практикум', ARRAY['devops','ci-cd','kubernetes']::text[], DATE '2026-02-25', TIME '17:00', TIME '20:00', 'Компьютерный класс 1', 'Практический интенсив по CI/CD пайплайнам и базовой оркестрации сервисов.', 'https://picsum.photos/seed/es-event-14/1200/630', 'IT-секции', 'CI/CD и DevOps практики на реальных примерах.', DATE '2026-02-22', 'org5@eventspace.local'),
    ('Финал киберспортивной лиги', ARRAY['esport','final','tournament']::text[], DATE '2026-03-01', TIME '13:00', TIME '18:00', 'Актовый зал 2', 'Финальные матчи межфакультетской киберлиги и церемония награждения.', 'https://picsum.photos/seed/es-event-15/1200/630', 'Спортивные', 'Финал киберлиги между факультетами.', DATE '2026-02-26', 'org3@eventspace.local'),
    ('Лекторий: цифровое право', ARRAY['law','digital','education']::text[], DATE '2026-03-05', TIME '17:30', TIME '19:30', 'Аудитория 201', 'Юридические аспекты цифровых продуктов: данные, лицензии и ответственность.', 'https://picsum.photos/seed/es-event-16/1200/630', 'Учебные', 'Юридические основы работы с цифровыми продуктами.', DATE '2026-03-02', 'org4@eventspace.local'),
    ('Практика SQL Battle', ARRAY['sql','database','practice']::text[], DATE '2026-03-11', TIME '18:00', TIME '20:30', 'Кабинет 202', 'Соревновательный вечер по SQL-задачам: скорость, точность, оптимизация.', 'https://picsum.photos/seed/es-event-17/1200/630', 'IT-секции', 'Соревнование по SQL и оптимизации запросов.', DATE '2026-03-08', 'org9@eventspace.local'),
    ('Демо-день стартапов', ARRAY['startup','pitch','demo-day']::text[], DATE '2026-03-15', TIME '12:00', TIME '17:00', 'Актовый зал 1', 'Презентации студенческих стартапов перед приглашенными менторами и инвесторами.', 'https://picsum.photos/seed/es-event-18/1200/630', 'Социальные', 'Презентации студенческих стартап-проектов.', DATE '2026-03-10', 'org7@eventspace.local'),
    ('Экологический субботник', ARRAY['eco','volunteer','community']::text[], DATE '2026-03-20', TIME '10:00', TIME '13:00', 'Холл 2', 'Командная уборка территории кампуса и запуск раздельного сбора отходов.', 'https://picsum.photos/seed/es-event-19/1200/630', 'Социальные', 'Экологическая акция и запуск эко-инициатив.', DATE '2026-03-18', 'org8@eventspace.local'),
    ('Подготовка к стажировкам BigTech', ARRAY['career','internship','interview']::text[], DATE '2026-03-24', TIME '18:00', TIME '21:00', 'Коворкинг', 'Сессия по подготовке резюме, техническому интервью и стратегии поиска стажировки.', 'https://picsum.photos/seed/es-event-20/1200/630', 'Учебные', 'Практика по резюме и интервью для стажировок.', DATE '2026-03-21', 'org6@eventspace.local'),

    ('Product Design Jam', ARRAY['design','product','ux']::text[], DATE '2026-03-27', TIME '17:30', TIME '21:00', 'Коворкинг', 'Командный дизайн-спринт по задачам пользовательского опыта и прототипированию.', 'https://picsum.photos/seed/es-event-21/1200/630', 'Учебные', 'Дизайн-спринт по продуктовым задачам.', DATE '2026-03-26', 'org4@eventspace.local'),
    ('Open Source Meetup', ARRAY['open-source','git','community']::text[], DATE '2026-03-29', TIME '18:00', TIME '20:30', 'Кабинет 101', 'Встреча контрибьюторов: как выбрать репозиторий и оформить первый pull request.', 'https://picsum.photos/seed/es-event-22/1200/630', 'IT-секции', 'Митап по вкладу в open source проекты.', DATE '2026-03-27', 'org5@eventspace.local'),
    ('Турнир по мини-футболу', ARRAY['sport','football','tournament']::text[], DATE '2026-04-02', TIME '12:00', TIME '16:30', 'Спортзал 2', 'Групповой этап и плей-офф среди студенческих команд.', 'https://picsum.photos/seed/es-event-23/1200/630', 'Спортивные', 'Турнир по мини-футболу среди команд факультетов.', DATE '2026-03-31', 'org3@eventspace.local'),
    ('Школа наставников', ARRAY['mentoring','leadership','community']::text[], DATE '2026-04-05', TIME '14:00', TIME '18:00', 'Аудитория 201', 'Интенсив для будущих наставников по сопровождению новичков и обратной связи.', 'https://picsum.photos/seed/es-event-24/1200/630', 'Социальные', 'Интенсив по наставничеству и поддержке новичков.', DATE '2026-04-02', 'org10@eventspace.local'),
    ('Конференция "Цифровой кампус"', ARRAY['conference','digital','edtech']::text[], DATE '2026-04-09', TIME '10:00', TIME '17:30', 'Актовый зал 2', 'Однодневная конференция про цифровизацию учебных процессов и сервисов кампуса.', 'https://picsum.photos/seed/es-event-25/1200/630', 'Учебные', 'Большая конференция о цифровой среде университета.', DATE '2026-04-05', 'org7@eventspace.local'),
    ('AI Reading Club #13', ARRAY['ai','llm','reading-club']::text[], DATE '2026-04-13', TIME '19:00', TIME '21:00', 'Кабинет 102', 'Разбор новой статьи по оценке качества LLM и практических метрик.', 'https://picsum.photos/seed/es-event-26/1200/630', 'IT-секции', 'Новый выпуск AI-клуба с разбором исследования.', DATE '2026-04-11', 'org1@eventspace.local'),
    ('Весенний хакатон', ARRAY['hackathon','spring','team']::text[], DATE '2026-04-18', TIME '10:00', TIME '20:00', 'Коворкинг', '24-часовой трек с менторством, чекпоинтами и финальной презентацией.', 'https://picsum.photos/seed/es-event-27/1200/630', 'IT-секции', 'Большой весенний хакатон с командами и менторами.', DATE '2026-04-13', 'org5@eventspace.local'),
    ('День карьеры и стажировок', ARRAY['career','hr','internships']::text[], DATE '2026-04-22', TIME '11:00', TIME '17:00', 'Холл', 'Стенды компаний, экспресс-собеседования и карьерные консультации.', 'https://picsum.photos/seed/es-event-28/1200/630', 'Социальные', 'Карьерный день со стендами компаний и интервью.', DATE '2026-04-18', 'org6@eventspace.local'),
    ('Java Backend Intensive', ARRAY['java','backend','spring']::text[], DATE '2026-04-28', TIME '17:30', TIME '21:00', 'Компьютерный класс 2', 'Практический интенсив по проектированию REST API и оптимизации запросов.', 'https://picsum.photos/seed/es-event-29/1200/630', 'IT-секции', 'Интенсив по Java backend и REST API.', DATE '2026-04-25', 'org9@eventspace.local'),
    ('Музыкальный вечер факультетов', ARRAY['music','culture','festival']::text[], DATE '2026-05-03', TIME '18:00', TIME '21:30', 'Актовый зал 1', 'Фестивальный вечер музыкальных коллективов факультетов.', 'https://picsum.photos/seed/es-event-30/1200/630', 'Культурные', 'Фестивальный музыкальный вечер в кампусе.', DATE '2026-04-30', 'org2@eventspace.local'),
    ('Лаборатория робототехники', ARRAY['robotics','engineering','practice']::text[], DATE '2026-05-10', TIME '13:00', TIME '17:00', 'Лаборатория химии', 'Сборка и программирование робототехнических платформ в командах.', 'https://picsum.photos/seed/es-event-31/1200/630', 'Учебные', 'Практика по робототехнике и командной разработке.', DATE '2026-05-06', 'org4@eventspace.local'),
    ('Data Engineering Meetup', ARRAY['data-engineering','etl','pipelines']::text[], DATE '2026-05-17', TIME '18:00', TIME '20:30', 'Кабинет 201', 'Обсуждение архитектуры ETL-пайплайнов и качества данных в продуктах.', 'https://picsum.photos/seed/es-event-32/1200/630', 'IT-секции', 'Митап по ETL, пайплайнам и качеству данных.', DATE '2026-05-14', 'org1@eventspace.local'),
    ('Турнир по шахматам', ARRAY['chess','sport','strategy']::text[], DATE '2026-05-24', TIME '11:00', TIME '16:00', 'Библиотека 2', 'Личный и командный зачет, быстрые партии и финал с призами.', 'https://picsum.photos/seed/es-event-33/1200/630', 'Спортивные', 'Шахматный турнир с личным и командным зачётом.', DATE '2026-05-20', 'org3@eventspace.local'),
    ('Летняя школа лидерства', ARRAY['leadership','soft-skills','team']::text[], DATE '2026-06-06', TIME '10:00', TIME '17:00', 'Аудитория 201', 'Однодневная школа по лидерским навыкам, фасилитации и конфликт-менеджменту.', 'https://picsum.photos/seed/es-event-34/1200/630', 'Учебные', 'Школа лидерства и командной коммуникации.', DATE '2026-06-02', 'org10@eventspace.local'),
    ('Cybersecurity CTF', ARRAY['security','ctf','practice']::text[], DATE '2026-06-14', TIME '10:00', TIME '18:00', 'Компьютерный класс 1', 'Практический CTF-турнир по web, network и reverse задачам.', 'https://picsum.photos/seed/es-event-35/1200/630', 'IT-секции', 'CTF-турнир по кибербезопасности и практическим задачам.', DATE '2026-06-10', 'org9@eventspace.local'),
    ('Graduation Networking Night', ARRAY['networking','career','alumni']::text[], DATE '2026-06-20', TIME '18:30', TIME '22:00', 'Кафе 2', 'Нетворкинг-вечер выпускников, студентов и партнеров университета.', 'https://picsum.photos/seed/es-event-36/1200/630', 'Социальные', 'Большой нетворкинг выпускников и студентов.', DATE '2026-06-16', 'org10@eventspace.local')
) AS v(
    name, tags, event_date, start_time, end_time, space_name,
    description, image_url, category_name, short_description, deadline, author_email
)
JOIN users u ON u.email = v.author_email
JOIN event_category c ON c.name = v.category_name
JOIN space s ON s.name = v.space_name;

--changeset codex:4
WITH seeded_events AS (
    SELECT e.id, e.start_time, e.end_time
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
)
INSERT INTO event_step (event_id, name, start_time, end_time, description)
SELECT
    se.id,
    'Регистрация',
    se.start_time,
    se.start_time + interval '20 minutes',
    'Встреча участников, проверка регистрации и знакомство'
FROM seeded_events se
WHERE (se.end_time - se.start_time) >= interval '1 hour';

--changeset codex:5
WITH seeded_events AS (
    SELECT e.id, e.start_time, e.end_time
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
)
INSERT INTO event_step (event_id, name, start_time, end_time, description)
SELECT
    se.id,
    'Основная программа',
    se.start_time + interval '20 minutes',
    se.end_time - interval '20 minutes',
    'Ключевые доклады, практическая часть и работа с вопросами'
FROM seeded_events se
WHERE (se.end_time - se.start_time) >= interval '1 hour';

--changeset codex:6
WITH seeded_events AS (
    SELECT e.id, e.start_time, e.end_time
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
)
INSERT INTO event_step (event_id, name, start_time, end_time, description)
SELECT
    se.id,
    'Нетворкинг',
    se.end_time - interval '20 minutes',
    se.end_time,
    'Свободное общение, обратная связь и обмен контактами'
FROM seeded_events se
WHERE (se.end_time - se.start_time) >= interval '1 hour';

--changeset codex:7
WITH seeded_events AS (
    SELECT e.id, e.event_date, e.author, s.capacity
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    JOIN space s ON s.id = e.space_id
    WHERE author_u.email LIKE 'org%@eventspace.local'
),
eligible_users AS (
    SELECT u.id
    FROM users u
    WHERE u.is_active = true
      AND u.email <> 'admin@admin.com'
),
ranked_candidates AS (
    SELECT
        se.id AS event_id,
        se.event_date,
        eu.id AS user_id,
        ROW_NUMBER() OVER (
            PARTITION BY se.id
            ORDER BY md5(se.id::text || ':' || eu.id::text)
        ) AS rn,
        md5('qr:' || se.id::text || ':' || eu.id::text) AS token_hash
    FROM seeded_events se
    JOIN eligible_users eu ON eu.id <> se.author
),
limits AS (
    SELECT
        se.id AS event_id,
        se.event_date,
        CASE
            WHEN se.event_date < DATE '2026-03-25' THEN GREATEST(8, LEAST(se.capacity - 2, 38))
            ELSE GREATEST(8, LEAST(se.capacity - 2, 28))
        END AS registration_limit,
        CASE
            WHEN se.event_date < DATE '2026-03-25' THEN GREATEST(5, LEAST(se.capacity - 5, 26))
            ELSE 0
        END AS attended_limit
    FROM seeded_events se
),
verifiers AS (
    SELECT
        u.id,
        ROW_NUMBER() OVER (ORDER BY u.id) AS rn
    FROM users u
    WHERE u.role = 'VERIFIER' AND u.is_active = true
)
INSERT INTO event_user (event_id, user_id, attended, qr_token, confirmed_by, confirmed_at, registered_at)
SELECT
    rc.event_id,
    rc.user_id,
    (rc.rn <= l.attended_limit) AS attended,
    (
        substr(rc.token_hash, 1, 8) || '-' ||
        substr(rc.token_hash, 9, 4) || '-' ||
        substr(rc.token_hash, 13, 4) || '-' ||
        substr(rc.token_hash, 17, 4) || '-' ||
        substr(rc.token_hash, 21, 12)
    )::uuid AS qr_token,
    CASE
        WHEN rc.rn <= l.attended_limit THEN (
            SELECT v.id
            FROM verifiers v
            ORDER BY abs(v.rn - ((rc.event_id + rc.user_id) % 3 + 1))
            LIMIT 1
        )
        ELSE NULL
    END AS confirmed_by,
    CASE
        WHEN rc.rn <= l.attended_limit THEN
            ((rc.event_date::timestamp + interval '1 hour') + ((rc.rn % 100)::text || ' minutes')::interval) AT TIME ZONE 'Europe/Moscow'
        ELSE NULL
    END AS confirmed_at,
    CASE
        WHEN rc.event_date < DATE '2026-03-25' THEN
            ((rc.event_date::timestamp - interval '10 days') + ((rc.rn % 96)::text || ' hours')::interval) AT TIME ZONE 'Europe/Moscow'
        ELSE
            CURRENT_TIMESTAMP - ((rc.rn % 240 + (rc.event_id % 12))::text || ' hours')::interval
    END AS registered_at
FROM ranked_candidates rc
JOIN limits l ON l.event_id = rc.event_id
WHERE rc.rn <= l.registration_limit
ON CONFLICT (event_id, user_id) DO NOTHING;

--changeset codex:8
WITH seeded_past_events AS (
    SELECT e.id, e.name, e.event_date, e.end_time
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
      AND e.event_date < DATE '2026-03-25'
),
attended AS (
    SELECT
        eu.event_id,
        eu.user_id,
        spe.name,
        spe.event_date,
        spe.end_time,
        ROW_NUMBER() OVER (
            PARTITION BY eu.event_id
            ORDER BY eu.confirmed_at NULLS LAST, eu.user_id
        ) AS rn,
        COUNT(*) OVER (PARTITION BY eu.event_id) AS total_attended
    FROM event_user eu
    JOIN seeded_past_events spe ON spe.id = eu.event_id
    WHERE eu.attended = true
),
scored_reviews AS (
    SELECT
        a.*,
        GREATEST(4, LEAST(14, a.total_attended / 2)) AS review_limit,
        CASE
            WHEN a.rn % 20 < 9 THEN 5
            WHEN a.rn % 20 < 15 THEN 4
            WHEN a.rn % 20 < 18 THEN 3
            WHEN a.rn % 20 = 18 THEN 2
            ELSE 1
        END AS rating
    FROM attended a
)
INSERT INTO event_review (user_id, event_id, title, content, rating, created_at)
SELECT
    sr.user_id,
    sr.event_id,
    LEFT('Отзыв: ' || sr.name, 128),
    CASE
        WHEN sr.rating = 5 THEN 'Отличная организация, тайминг выдержан, формат оказался очень полезным.'
        WHEN sr.rating = 4 THEN 'Сильная программа и спикеры, хотелось бы чуть больше времени на вопросы.'
        WHEN sr.rating = 3 THEN 'Мероприятие полезное, но часть блоков показалась слишком быстрой.'
        WHEN sr.rating = 2 THEN 'Тема интересная, но не хватило структуры и практических примеров.'
        ELSE 'Ожидания не совпали с форматом, хотелось более глубокую проработку.'
    END,
    sr.rating,
    ((sr.event_date::timestamp + sr.end_time) + ((sr.rn % 72 + 1)::text || ' hours')::interval) AT TIME ZONE 'Europe/Moscow'
FROM scored_reviews sr
WHERE sr.rn <= sr.review_limit
ON CONFLICT (event_id, user_id) DO NOTHING;

--changeset codex:9
WITH seeded_reviews AS (
    SELECT er.id, er.user_id, er.created_at
    FROM event_review er
    JOIN event e ON e.id = er.event_id
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
),
candidates AS (
    SELECT
        sr.id AS review_id,
        u.id AS user_id,
        sr.created_at,
        ROW_NUMBER() OVER (
            PARTITION BY sr.id
            ORDER BY md5(sr.id::text || ':' || u.id::text)
        ) AS rn,
        (2 + (sr.id % 7)) AS mark_limit
    FROM seeded_reviews sr
    JOIN users u ON u.is_active = true AND u.id <> sr.user_id
)
INSERT INTO helpful_mark (user_id, review_id, created_at)
SELECT
    c.user_id,
    c.review_id,
    c.created_at + ((c.rn % 30)::text || ' minutes')::interval
FROM candidates c
WHERE c.rn <= c.mark_limit
ON CONFLICT (user_id, review_id) DO NOTHING;

--changeset codex:10
WITH seeded_events AS (
    SELECT
        e.id,
        e.name,
        e.short_description,
        e.author,
        ROW_NUMBER() OVER (ORDER BY e.event_date DESC, e.id DESC) AS rn
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
),
admin_user AS (
    SELECT id
    FROM users
    WHERE email = 'admin@admin.com'
    LIMIT 1
),
base AS (
    SELECT
        se.id AS target_id,
        se.name,
        se.short_description,
        se.rn,
        (DATE '2026-03-25' - ((se.rn + 1)::int)) AS complaint_date,
        CASE
            WHEN se.rn % 4 = 0 THEN 'UNDER_CONSIDERATION'
            WHEN se.rn % 2 = 0 THEN 'RESOLVED'
            ELSE 'REJECTED'
        END AS status,
        (
            SELECT u.id
            FROM users u
            WHERE u.is_active = true
              AND u.role = 'PARTICIPANT'
              AND u.id <> se.author
            ORDER BY md5(se.id::text || ':' || u.id::text)
            LIMIT 1
        ) AS author_id
    FROM seeded_events se
    WHERE se.rn <= 12
)
INSERT INTO complaint (
    author_id, complaint_type_id, complaint_date, status, description,
    target_type, target_id, target_snapshot, admin_comment, reviewed_by, reviewed_at
)
SELECT
    b.author_id,
    ((b.rn - 1) % 6) + 1,
    b.complaint_date,
    b.status,
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN 'Требуется дополнительная проверка деталей публикации.'
        WHEN b.status = 'RESOLVED' THEN 'Жалоба подтверждена, материал скорректирован.'
        ELSE 'Нарушений не выявлено после проверки.'
    END,
    'EVENT',
    b.target_id,
    jsonb_build_object('name', b.name, 'shortDescription', b.short_description),
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN NULL
        WHEN b.status = 'RESOLVED' THEN 'Подтверждено нарушение правил публикации.'
        ELSE 'Оснований для санкций не обнаружено.'
    END,
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN NULL
        ELSE (SELECT id FROM admin_user)
    END,
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN NULL
        ELSE ((b.complaint_date::timestamp + interval '2 days') AT TIME ZONE 'Europe/Moscow')
    END
FROM base b
WHERE b.author_id IS NOT NULL;

--changeset codex:11
WITH seeded_reviews AS (
    SELECT
        er.id,
        er.title,
        er.content,
        er.rating,
        er.user_id,
        ROW_NUMBER() OVER (ORDER BY er.created_at DESC, er.id DESC) AS rn
    FROM event_review er
    JOIN event e ON e.id = er.event_id
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
),
admin_user AS (
    SELECT id
    FROM users
    WHERE email = 'admin@admin.com'
    LIMIT 1
),
base AS (
    SELECT
        sr.id AS target_id,
        sr.title,
        sr.content,
        sr.rating,
        sr.rn,
        (DATE '2026-03-25' - ((sr.rn + 3)::int)) AS complaint_date,
        CASE
            WHEN sr.rn % 5 = 0 THEN 'UNDER_CONSIDERATION'
            WHEN sr.rn % 2 = 0 THEN 'RESOLVED'
            ELSE 'REJECTED'
        END AS status,
        (
            SELECT u.id
            FROM users u
            WHERE u.is_active = true
              AND u.role = 'PARTICIPANT'
              AND u.id <> sr.user_id
            ORDER BY md5(sr.id::text || ':' || u.id::text)
            LIMIT 1
        ) AS author_id
    FROM seeded_reviews sr
    WHERE sr.rn <= 10
)
INSERT INTO complaint (
    author_id, complaint_type_id, complaint_date, status, description,
    target_type, target_id, target_snapshot, admin_comment, reviewed_by, reviewed_at
)
SELECT
    b.author_id,
    ((b.rn + 1) % 6) + 1,
    b.complaint_date,
    b.status,
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN 'Запрошена ручная модерация отзыва.'
        WHEN b.status = 'RESOLVED' THEN 'Найдено нарушение формата, отзыв отредактирован.'
        ELSE 'Отзыв соответствует правилам платформы.'
    END,
    'EVENT_REVIEW',
    b.target_id,
    jsonb_build_object(
        'title', LEFT(b.title, 120),
        'content', LEFT(b.content, 180),
        'rating', b.rating
    ),
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN NULL
        WHEN b.status = 'RESOLVED' THEN 'Решение: частичная модерация контента.'
        ELSE 'Жалоба отклонена после проверки.'
    END,
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN NULL
        ELSE (SELECT id FROM admin_user)
    END,
    CASE
        WHEN b.status = 'UNDER_CONSIDERATION' THEN NULL
        ELSE ((b.complaint_date::timestamp + interval '1 day') AT TIME ZONE 'Europe/Moscow')
    END
FROM base b
WHERE b.author_id IS NOT NULL;

--changeset codex:12
INSERT INTO building (name, address, latitude, longitude)
VALUES
    ('Кампус Невский', 'Санкт-Петербург, Невский проспект, 88', 59.9342802, 30.3350986),
    ('Кампус Василеостровский', 'Санкт-Петербург, 8-я линия В.О., 25', 59.9427428, 30.2789822),
    ('Кампус Петроградский', 'Санкт-Петербург, Каменноостровский проспект, 42', 59.9666997, 30.3115786),
    ('Кампус Московский', 'Санкт-Петербург, Московский проспект, 149', 59.8796124, 30.3195342),
    ('Кампус Приморский', 'Санкт-Петербург, Коломяжский проспект, 15к2', 60.0054231, 30.3023145)
ON CONFLICT (name) DO NOTHING;

--changeset codex:13
UPDATE users
SET avatar_url = format('https://i.pravatar.cc/300?img=%s', ((id - 1) % 70) + 1)
WHERE email LIKE '%@eventspace.local';
