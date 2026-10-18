# BE MUSIC — проверка и оставшиеся отличия

Дата: 15 октября 2026. База: опубликованная v31-1, commit 3294a112f715a4c2f93700c365865e0044c43b50.

## Что проверено

- Лендинг сравнивался с сохранённым снимком оригинала от 12.10.2026 в облачном Chrome на ширинах 320, 390, 480, 640, 768, 960 и 1280 px. Это накопленные проверки разных секций, не полный попиксельный прогон каждой комбинации.
- Первый экран и блок о студии: визуальная проверка 480 px, измерения 960 px. Положение и размеры заголовка и кнопок первого экрана совпали; разница высот отдельных текстов о студии менее 1 px.
- Программы, преимущества, руководитель, сертификат, отзывы, пробное занятие, FAQ, контакты и футер проверялись в предыдущих проходах. Последний фикс v31 восстановил две колонки футера на 480–639 px; на480px высота900.0625px совпала, на390px одна колонка1225.65625px без переполнения.
- Отзывы: дополнительные карточки раскрываются, кнопка скрывается. На960px видеорамки600×338px совпали. Воспроизведение внешних видео не подтверждено: наблюдались ошибки загрузки.
- FAQ: раскрытый ответ о пробном занятии на480px визуально совпал. На960px высоты раскрытого FAQ1615.609375px, контактов1241.953125px и футера818.71875px совпали.
- Галерея «Наша атмосфера»: на640px просмотрено кадрирование, проверен переход вперёд на вторую фотографию и возврат.
- Наставники: на640px проверен переход счётчика1→2 из10 и возврат.
- Мобильное меню640px: открывается, ширина625px; переход «Контакты» меняет якорь на#contacts, закрывает меню, переполнение0. Это проверка перехода, не отправка заявки.
- Из активной сборки восстановлены три отсутствовавших локально файла стилей v26-3,v27,v28 из репозитория. На опубликованном сайте они присутствовали. Все ресурсы компактного комплекта доступны локально.

## Что остаётся отличаться или не подтверждено

| Участок | Состояние |
|---|---|
| Шапка640px | Осознанное отличие: исходный сбой с кнопкой вне экрана не воспроизводится |
| Формы | Внешний вид восстановлен; отправка намеренно отключена |
| Внутренние страницы | Направления и лояльность пока открываются на исходном домене; они не входят в независимый комплект |
| Текст | На отдельных ширинах остаются дробные различия высоты примерно до2.24px в проверенных блоках; отсутствие больших различий в этих замерах не доказывает идентичность всех секций |
| Анимации | Фазы в двух окнах не синхронизированы; вращающиеся звёзды и бегущие строки нельзя сравнивать по одному кадру как статичные объекты |
| ВидеоVK | Внешний сервис, доступность и воспроизведение не гарантированы |
| КартаЯндекса | Официальный внешний iframe; источник в QA иногда не загружается, содержимое карты не объявляется идентичным |
| События | Сохранено Feed not found, ранее подтверждённое на действующем оригинале; живой ленты в независимом комплекте нет |
| Safari/iPhone | На физическом устройстве не проверено |

## Автономность

В BEMUSIC_STANDALONE.html встроены CSS, JavaScript, шрифты и изображения. Тильда не нужна для отрисовки основных блоков. Для карты, видео и переходов во внешние сервисы нужен интернет. Политики остаются соседними HTML-файлами.

Полная идентичность всего сайта не заявляется. Независимая главная страница и внешние страницы направлений — разный объём работ.


## Дополнительная сверка v32, 16.10.2026

Сравнены 120–122 пар элементов на ширинах 320, 390, 480, 640, 768, 960 и 1280 px. Сопоставление выполнялось по идентификатору элемента и секции после загрузки и посещения всех секций.

Исправлены округления межстрочного интервала, фиксированные фоновые карточки на 640–959 px, сетка точек и круг на 960–1199 px, смещение двух декоративных полос на промежуточных ширинах. Повторная проверка карточек на 768 px подтвердила равенство координат и размеров. Обычные текстовые блоки совпали по высоте; бегущая строка на 960 px имеет разницу контейнера 1 px при одинаковом межстрочном интервале и требует отдельного анализа. Скрытые и пустые служебные элементы не считаются визуальными расхождениями.

Это проверка измеренных элементов, а не доказательство полной попиксельной идентичности всех состояний и браузеров. Внешние сервисы, Safari и внутренние страницы сохраняют ограничения, описанные выше.


## v33 — вложенное начертание и открытые состояния, 16.10.2026

Выявлена причина разницы бегущей строки: браузерное bolder на родителе с font-weight:300 давало400, тогда как Tilda задаёт strong700. Восстановлен явный700 для вложенных strong обычных секций и table-cell у строки BE MUSIC. Повторный замер на960: обе версии78px, strong700, line-height77px. Прежняя разница1px устранена.

Все8раскрытыхFAQ на390px совпали по высоте. Проверены479/639/641/959/1199/1200px с фактическим изменением размера iframe. У статичных видимых элементов новых отклонений не найдено; фаза анимации и скрытые служебные элементы исключаются. Окно Николая Мультюкова сопоставлено визуально на390px.

В мобильном меню обнаружены и исправлены лишний интервал20px между рядами, уменьшенный логотип из-за фиксированной высоты55px, лишние переносы сертификата и лояльности. Использованы размеры оригинальных мобильных артбордов730px и710px, логотип227×87px и226×86,625px, ряды28px и исходные координаты. Финальный статус проверки меню указан в реестрах проекта.


На640pxсохранена читаемая адаптация меню: оригинал имеет наложения пунктов, которые намеренно не копируются. Во внешних сервисах и на физическомSafariидентичность не подтверждена.


## v34 — биографии наставников, 16.10.2026

При проверке окна Антона Орлова на768px обнаружено451,90625px вместо444,90625px у оригинала. Причина: в импортированных span сохранился inline font-family:mix, а автономная сборка использует BMOriginal. Браузерный запасной шрифт добавлял1px на каждую строку списка. Такие ссылки найдены в6фрагментах биографии Антона и8фрагментах Светланы Бадалян. Точечно восстановлено наследование встроенного шрифта, без изменения текста/начертаний. В статичной разметке главной старых inline ссылок наmixнет.

На768pxкарточки наставников совпали по фото240×240px, ширине карточки280px, внутренней ширине240px, заголовку/подписи/кнопке (вертикальная разница0,03125px от округления). Перелистывание сдвигает на одну карточку и показываетАнтона в той же позиции. Галерея на390pxвизуально совпала после переключения на второй снимок; полный круг4фото вернулся к первому.


Повторная проверка v34: окноАнтона768—620×444,90625px,биография243,171875px;390—350×488,171875px,биография321,4375px. ОкноСветланы768—620×692,875px,биография491,140625px;390—335×998,296875px,биография831,5625px. Все размеры равны оригиналу. В заголовкеАнтона также обнаружен inline mix; наследование встроенного шрифта восстановлено для всего окна наставника. Тексты не менялись.


## v37 — появление при прокрутке, 16.10.2026

По атрибутам исходного снимка восстановлены 42 эффекта появления обычных элементов: fadeinup 30/50/70px за2с и zoomin0.9→1 за1с, задержки0.1с. Easing подтверждён computed style оригинала: cubic-bezier(0.19,1,0.22,1). 39 эффектов включены на мобильной ширине,3 только на desktop>=1200. Циклические анимации исключены из этой карты, существующие повороты/бегущие строки сохранены. При reduced-motion эффекты отключены, при фокусе скрытый элемент сразу показывается. Проверка синтаксиса и отдельный сценарий запуска/мобильной фильтрации/reduced-motion пройдены. Полная синхронизация момента запуска с Tilda не утверждается.


## v38 — задержки запуска, 16.10.2026

По сохранённому tilda-animation-2.0.min.js подтверждены1500мс до начальной настройки,250мс дополнительного ожидания scroll observer, учёт transitionDelay в observer и самой transition. Повторено самостоятельным кодом без подключенияTilda. Элементы выше верхней границы экрана более чем на500px сразу считаются показанными после инициализации, как в исходнике. Исходные длительности и easingv37 сохранены. При уменьшении движения или фокусе содержимое остаётся доступным. Точное совпадение относительного момента загрузки разных скриптов/браузеров не заявляется.


## v39 — бегущие строки, 16.10.2026

В исходном QA все триt1003__content имеют running-анимацию даже до посещения секций. Собственные строки раньше были paused до первого попадания в экран, что давало разную фазу и нарушало синхронность между тремя строками. В motion-v8.js строки теперь запускаются сразу после построения; градиентная строкаBE MUSIC по-прежнему ждёт видимости, как её исходныйSBS intoview. В исходных@keyframes длина обычной строки округлена:475px при ширине475.28125px;528px при528.296875px. Длительность9.5с/10.56с соответствует50px/с. Восстановлено целое значение длины цикла. Reduced-motion сохранён. Абсолютная фаза после разных сетевых загрузок не гарантируется.


## v40 — вертикальная геометрия бегущих строк, 16.10.2026

Обнаружено при визуальнойпроверкеv39: высота всейстроки совпадала,но собственныйтекст центрировалсясразу во всейвысоте вместе с внешнимиотступами. Источник имеет70pxконтент+отдельныеpadding. Восстановлены desktopотступы30/0,30/30,75/0 и mobile15/0,15/15,45/0 длятрёхстрок, box-sizing:border-box, исходныйline-height1.45. Общая высота не меняется. Точки-разделители получили исходную формуэллипса изSVG(радиусx41.6918%,центрx51.1351%,радиусy50%). Скорость/запускv39 сохранены.

Уточнение v40: исходный paddingменяется после480px, а размершрифта14pxсохраняетсявключительно640px. Раньше собственные высоты85/100/115 сохранялисьдо639px, и вторая строкаоставалась100pxвместо130pxнаширокихэкранах. Восстановлены явныевысоты100/130/145pxсвыше480px и85/100/115pxдо480pxвключительно, font14pxдо640px. Это исправляет и накопленный вертикальныйсдвиг последующих секций.

Финальноеуточнениеv40-2: действующийbemusic-odi.ruнаширокомэкранеподтвердилline-height1.55(18px/27.9px),вмобильномснимке14px/20.3px=1.45. Установлено1.55свыше640px,1.45до640pxвключительно. Ранее вчерновикеv40 было1.45длявсехширин; этотчерновикнеявляетсяфинальнымпровереннымкомплектом.

## v41 — desktop expanded reviews

The source uses two leading videos and three columns for the nine additional videos above 960px. Restore the additional three-column grid. At 961–1200px the source uses a 940px content width, 20px horizontal gaps and 16px captions; above 1200px retain 1160px, 40px gaps and 18px captions. Mobile and tablet rules remain unchanged. The reveal button disappears after opening in both versions; no collapse control is added. External VK playback remains provider-dependent.

Follow-up v41-2: use fixed-width flex columns matching source wrapping above960px, rather than fractional grid tracks. Leading videos560px/additional360px above1200px,460px/300px through1200px. Only additional items4–9 have40px top margins; this preserves source wrap behavior at961px/1201px with a scrollbar.

## v42 — accessible dialog names, 17.10.2026

After a teacher biography changes into a booking form, its prior aria-label named the teacher. Set the form dialog name on every trial/gift open, preserving teacher names in biography dialogs. No visible layout, text, form submission or original production changes. Trial close/reopen/Escape and restored scroll lock verified at320/390/640px; gift choices and focus restoration verified at390px. Mobile pointer activation inside the cloud QA iframe remains inconclusive; keyboard activation works.

v42-2: all ten teacher-to-trial chains verified; focus returns to the corresponding teacher and scroll unlocks. Normalize rendered heading whitespace when naming a biography, so line breaks do not merge Anton Orlov or Maria Deeva. Visible text and geometry unchanged.


## v43 — independent vocal page, 17.10.2026

Added vokal-v-odincovo.html from the recorded 12.10.2026 public source: 11 responsive compositions and 71 positioned elements, eight accordion questions, trial-lesson steps, curriculum, five concert/master-class videos, student results with four additional videos, the shared ten-teacher slider, certificate, contacts and footer. Rendering and interactions use local CSS and independent JavaScript; the original Tilda runtime is restricted to qa-vocal-reference.html for comparison. Form submissions remain disabled.

The main navigation now points vocal links to the local page. Guitar, piano, kids and loyalty remain on the source domain. Source background shapes use responsive percentage widths and actual center alignment; text line heights and student video heights follow source integer rounding. Shared home-page visuals remain unchanged.

Validation results and limitations are recorded in the project state; full pixel identity and physical Safari/iPhone verification are not claimed.

The v43 ZIP contains editable pages and active dependencies. Self-contained previews are published separately to avoid duplicate embedded resources. The final vocal desktop header retains original dark links.

## v44 — independent guitar page, 17.10.2026

Added original guitar hero, audience section, four FAQ answers, lesson steps, curriculum, concert videos, four student results, shared teachers, certificate, contacts and footer. Native CSS replaces source design-coordinate runtime: 10 compositions, 61 positioned elements; local assets and independent interactions. Source runtime is retained only in the QA fixture. Inline source font declarations are mapped to the local font. Main and vocal links now use the local guitar page; piano, kids and loyalty remain external. Form submission remains disabled. Geometry and functional checks are recorded in project state.

## v45 — independent piano page, 17.10.2026

Added the original piano page: seven responsive compositions and 47 positioned elements; three FAQ answers, trial-lesson steps, curriculum, six student videos, shared ten-teacher slider, piano certificate, contacts and footer. Local CSS and independent JavaScript replace the source runtime. Source inline fonts are mapped to BMOriginal. The source has no concert section here; none is added. Main, vocal and guitar navigation now points to the local piano page. Kids and loyalty remain external. Form submissions stay disabled. The original Tilda runtime appears only in qa-piano-reference.html, excluded from release. Detailed browser comparisons and limitations are recorded in project state.


## v46 — детская страница, 18.10.2026

Перенесена kids.html: 11 адаптивных композиций, 90 позиционированных элементов, три подробные программы, восемь вопросов, две группы раскрываемых видео и галерея из 30 исходных фотографий. Все четыре направления теперь имеют локальные переходы. Программа лояльности остаётся внешней.

В предыдущем сеансе сверены координаты 90 элементов на ширинах 320/390/480/640/768/960/1280 без отклонений более 1 px; проверен полный цикл галереи на 1280 px. После сброса сессии восстановлен опубликованный кандидат 7855371. Повторно исправлено ошибочное отключение двух кнопок «Посмотреть ещё»: disabled применяется только внутри форм. Телефонный селектор использует 205 исходных стран и масок, локальный спрайт флагов и собственный JavaScript; внешний геосервис Tilda не вызывается. Начальное значение US соответствует облачному эталону, ручной выбор сохраняется локально. Отправка заявки отключена.

Комплект v46 содержит только активные зависимости. Одинаковые ресурсы vocal/guitar/piano/kids объединены после сравнения байтов, без перекодирования изображений. Исторические файлы сохранены в репозитории. QA-страницы и исходный Tilda runtime не входят в релиз. Полная пиксельная идентичность и проверка на физическом iPhone/Safari не заявляются.

Проверка замыкания локальных зависимостей выявила старую отсутствующую style.css в двух политиках. Их ссылки исправлены на существующую общую bemusic-shared-v43.css.


## v47 — программа лояльности, 18.10.2026

Снимок bemusic-odi.ru/programma-loyalnosti-be-music от12.10.2026 и живая страница18.10.2026 содержат только общие шапку, разделитель и футер. Отдельного содержимого программы лояльности нет. Независимая programma-loyalnosti-be-music.html сохраняет это состояние; заголовок и вымышленные бонусные условия не добавлены. Использованы уже проверенные общие компоненты независимой v46, минимальный локальный runtime управляет только навигацией. Tilda runtime остаётся только в QA-эталоне, исключённом из релиза. Ссылки всех основных страниц переведены на локальную страницу лояльности. Пять запланированных страниц теперь входят в независимый комплект.

Формы остаются намеренно отключёнными. Production bemusic-odi.ru не менялся. Полная пиксельная идентичность и физический Safari/iPhone не заявляются.
