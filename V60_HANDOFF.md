# BE MUSIC v60 — текущая работа

22.10.2026. Пользователь Павел, ассистент мужского рода. Цель максимальное сходство независимого preview с оригиналом. Production не изменять; отправка форм отключена. Публикация preview и GitHub browser uploads разрешены ранее, не переспрашивать. Субагентов не запускать.

## Опубликованный runtime
Commit 8f0a1484834951d957de7864a45199e1098cd24c: Center short enquiry forms and preserve source overflow alignment (v60).
Pages run #199 https://github.com/korpachevpavel-del/bemusic-preview/actions/runs/39800037504 — build завершён, deploy succeeded за1m44s; опубликованный CSS v60-1 и исправленная форма уже проверены в live iframe.
Пока актуальный финальный архив v59, v60 package ещё НЕ опубликован.

## Исправление
Исходная короткая форма на640×900 имеет y83.7109375, собственная раньше y65 (смещение18.7109375). Все внутренние размеры совпадают.
Новый fidelity-v60.css включает flex column только от561px, flex:none/margin:auto у содержимого. При переполнении добавляется order-static с margin:0 auto. В fidelity-v5-7.js layoutOrder проверяет overflow после showModal, resize и добавления полей (MutationObserver). После переполнения static сохраняется до закрытия, как Tilda. На повторном открытии сбрасывается, scrollTop=0. Close guard if(dialog.open)return сохранён.
Обновлены5страниц,4builder,2standalone, harness v60-1.

## Свежие доказательства
qa-v60-forms.json — реальные парные DOM измерения финальной v60. Сейчас64кейса: home,vocal,guitar,piano ×8ширин(320,390,480,640,768,960,1024,1280)×trial/gift. Все diffs=[]; disabled submit true, личные поля пусты.
qa-v59-forms.mjs — актуальный reader/runner (название историческое). Сравнивает outer scroll/clientheight,7основныхблоков,видимыеполя,согласия,группывыбора,тексты. Не сравнивает скрытые native checkboxes с нарисованными индикаторами, семейства font имеют разные имена, но одинаковые исходные файлы.
qa-v59-confirmation.json и qa-v59-audit.mjs опубликованы fe50ce1998f21f60801b6f6c39cc5b99d89e5265 (8 свежих финальных v59 биографий). Предыдущий подробный контекст V59_HANDOFF.md.

## Продолжить
Проверить kids,standalone,vocalstandalone ×8ширин×2формы (ещё48кейсов) тем же runner, затем отдельную kids-intake форму и resize/cleanup/биография→форма. Затем собрать/проверить/опубликовать v60 ZIP и обновить BEMUSIC_AUDIT.md. Далее общий визуальный проход всех страниц. Не заявлять полную идентичность/Safari.

## Важное про CUA
Рабочая папка /workspace/scratch/d00c2abdbfec/bemusic-v59 (git worktree от6c0c7fd; локальные измененияv60 ужепубличны8f0a148). Корневая cwd содержит отчёты.
Browser1, tab1 pub GitHub, tab3 qa, tab4 qb. pool содержит2iframe пары src/own. Сейчас kids320/390, окназакрыты.
fs импорт node:fs/promises. fh импорт qa-v59-forms.mjs?revision=10. finalFormRows64, fa runner пишет /home/oai/share/d00c2abdbfec/qa-v60-forms.json. audit.navigate(page,widths) изqa-v59-audit.mjs меняет harness, pool.page/width.
Открывать fa.open(type) в ОТДЕЛЬНОМ CUA вызове. В следующем вызове fa.save(type);fa.close(); при необходимости resize/navigate. НЕ открывать следующую форму сразу после close в томже вызове: asyncfocus/анимации браузера дают ложные состояния. Open использует click по visible:true, close использует Escape последовательно, проверяет own закрытие. Press Enter на ссылках иногда не активировал кнопку, click надёжнее. После первых32кейсов helper теперь открывает click visible:true, закрывает Escape последовательно; Enter иногда не активирует ссылки. Измерять в следующем CUA вызове после открытия (иначе анимация можетбыть frozen).
Текущий helper сохраняет каждую пару на диск. Не включать неоткрытые/переходные состояния в финальную статистику. Старый qa-v59-forms.json — сырые попытки доисправления/отладка, не считать финальным отчётом.
GitHub connector read работает; write403. Browser fallback ранее явно авторизован. Upload через Add file→Upload files→filechooser.setFiles(shared absolute paths), дождаться всех файлов и исчезновения Uploading, Commit summary, Commit changes; проверить новый SHA. Нельзя заканчивать только нажатием.
