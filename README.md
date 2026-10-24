# English Tutor

Английский на слух по аудиокнигам, на телефоне: текст подсвечивается за голосом слово в слово, тап по слову даёт перевод в контексте, слова копятся в словарь и повторяются карточками. Есть режим «тень» (пауза после каждой фразы) и диктант.

Книги и расшифровки хранятся только на устройстве (IndexedDB) и никуда не загружаются. В этом репозитории только код.

## Установка на телефон

- **iPhone:** открыть сайт в Safari → ☰ → «Поделиться» → «На экран „Домой"».
- **Android:** Chrome → меню ⋮ → «Установить приложение».

## Книги

Нужны MP3-части и файлы расшифровки `.json` с теми же именами (формат `transcribe.py` из проекта hp-english-tutor: сегменты со словами и таймкодами). Выбрать их все разом через «Книга» → «Выбрать файлы».

## Разбор слов

Без ключа: бесплатный словарь (dictionaryapi.dev + MyMemory). С ключом: Gemini (бесплатный тариф Google AI Studio) или Claude (Haiku), перевод с учётом фразы. Ключ хранится только на устройстве.

## Обновление

1. Правки в `src/tutor.html`.
2. `python3 build.py` — соберёт `index.html` и обновит версию кэша в `sw.js`.
3. Закоммитить и запушить.

`en-frequency.txt` — частотный список OpenSubtitles 2018 из [hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords) (CC BY-SA 4.0), по нему считается «понятно ≈X%».

## Библиотека

На полке есть раздел «Библиотека»: книги LibriVox (общественное достояние) — «The Gift of the Magi» (O. Henry), «The Happy Prince and Other Tales» (Oscar Wilde), «Alice's Adventures in Wonderland» (Lewis Carroll), «A Scandal in Bohemia» (Arthur Conan Doyle). Расшифровки с таймкодами слов сделаны Whisper (`mlx-community/whisper-base.en-mlx`) и лежат в `library/`, аудио приложение скачивает на телефон прямо с archive.org.

Обложки: иллюстрации из общественного достояния с Wikimedia Commons — [O. Henry](https://commons.wikimedia.org/wiki/File:FourMillion16.png); [Crane, Walter, 1845-1915](https://commons.wikimedia.org/wiki/File:Plate_1_of_The_Happy_Prince_and_Other_Tales_(1888).png); [Sir John Tenniel](https://commons.wikimedia.org/wiki/File:Alice-white-rabbit.jpg); [Sidney Paget (1860 - 1908)](https://commons.wikimedia.org/wiki/File:A_Scandal_in_Bohemia.jpg).

Ссылка `#demo` сразу добавляет и открывает «A Scandal in Bohemia».

`vendor/ts-fsrs.mjs` — [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) 5.4.2 (MIT), алгоритм интервального повторения FSRS.
