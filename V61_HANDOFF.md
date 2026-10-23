# BE MUSIC v61 — опрос, 23.10.2026

Павел; ассистент мужского рода. Максимальное сходство независимого preview. Production не менять, заявки отключены. Публикация preview и GitHub uploads явно разрешены. Без субагентов.

v60 завершён: runtime3ff9a7e, package eff3b9a, checkpoint a55d39e. См.V60_HANDOFF.md. Не повторять формы и не переделывать ленту Feed not found.

Рабочая папка bemusic-v61 от a55d39e. Клоны current/preview устарели. Новые quiz-v61.css/js подключены только index.html; это ПЕРВАЯ ревизия, ещё не финальный PASS. Standalone и ZIP пока v60. Перед завершением проверить все6шагов×8ширин, назад/resize; собрать standalone/ZIPv61 и обновить аудит.

Подтверждены source quiz widths600 на768/960;780на1024;960на1280. Headerpadding30px45px, title46/52, icon26+gap10. Desktop header164, tablet268. Desktop quiz608 включая8border; wrapper600, area436. Tablet wrapperminheight650, но растёт до681.03125 на первом шаге, quiz689.03125/section959.03125.

Source area displayflex column; optionsflex1, padding45px45px55px; footersticky bottom0, padding-top20pxgradient + footerpadding0 45px45px. Наdesktopесли options+footer>436внутренняяпрокрутка15px, уменьшающаяконтент:1280parent847, image label198.25, outerimage200.25square.1024parent667,label153.25,image155.25square.768parent502,label112,image114square.4cols gap18, только2ответа. Caption16/17.6 margin10. Questionmargin25выше1200,20до1200, imagepaddingtop7. Textanswers2cols gap15, labelpaddingtop.4px, radio20, gap10, font16/19.2. Footerbuttonnext52.390625high,138.84375wide, font16/22.4,padding15px30px, text+svg18gap10. Prev52pxreservedatstep0.

Source mobile firststep высота совпадает после view; offscreenневалиден из-заstickyclone. Изменения пока scopedmin641 кроме кнопочногоmarkup ипробелавtitle. Проверитьчтоmobileнеизменился.

GitHubreadconnectorworks/write403исторически; browseruploadразрешён. ПослеcommitждиPagesSuccess, затемпроверьверсию и всеcases. СохраняйJSONвgit,средаможетсброситься.

## v61-3 перед финальной сверкой
91ba53b v61-2 опубликована. Выполнен полный диагностический проход6×8=48, qa-v61-2-diagnostic.json. НЕ PASS: выявлены mobile2cols>440, sourcewrappermin720+8border, sourcefooterотдельнаяstickyпанель107.390625+promptpaddingbottom35, sourcefixeddesktopgap.3em, gap25уquestions>=961, footermax45%>=960, descriptionfont12до1200, finalcontactgap20до960.
Подготовленаv61-3: mobilelayoutпереведёнсмагическихminheightquiz-layout-v24наflexflow; CSSminheight0!importantперекрываетстарыйinlineрасчёт. options30px20px25px, questionprogressabsolute; mobileimagepadding7перенесёнвконтейнер, откудаубранpaddinglabel. Answerinputиtextspanтеперьпрямыедетиlabel(какsource),plainрадиоиндикаторmargin-top−.4px. Sourceкнопочныйstep3совпадаетспятым.
Важно: вsourceHTMLsubmitтекстОТПРАВИТЬЗАЯВКУ, ноruntimeменяетнаОТПРАВИТЬ. v61-2ошибочноподставлялаЗАЯВКУ,вv61-3этоубрано. Sourcebuttonnexttext56.046875+icon18+gap4.8+padding60=138.84375.
Всяматрицадолжнабытьповторенанаv61-3. Потомназад/resize,packagev61/standalone,аудит. Sourceбрaузерoriginalfrozenможетнеавтоперейтиповторнымкликомнаужевыбранныйradio: тогдажмиNext,нещелкайвыбранныйповторно.

## v61-3 проверена; v61-4 scroll cleanup
Runtime25045fc, Pages208Success2m30s39947497646. Все48core6×8совпалипоизмеряемойгеометрии,включаяconsentlabels. 8backпроверок:7PASS,1024сохранилarea.scrollTop24pxпослефиналаиобрезалверх. Новыйv61-4сбрасываетarea.scrollTop=0послерендеракаждогошага. CSSнеизменён. qa-v61-3-comparison.jsonсодержит48corePASS+8backс1диагностическимрасхождением. qa-v61-functional.jsonпроверяетdisabledsubmit/blankfields/сохранениеответов. Нужнопроверитьv61-4back/resize/coreиупаковатьфинал.
