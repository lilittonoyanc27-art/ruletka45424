export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  questionEs: string;
  translationRu: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. TENER — 10 вопросов
  {
    id: 1,
    category: "TENER",
    questionEs: "Yo ___ dos clases de español esta semana.",
    translationRu: "На этой неделе у меня два урока испанского.",
    options: [
      { id: "A", text: "tienes" },
      { id: "B", text: "tengo" },
      { id: "C", text: "tiene" },
      { id: "D", text: "tenemos" }
    ],
    correctAnswer: "B",
    explanation: "С местоимением 'Yo' используется форма 'tengo'."
  },
  {
    id: 2,
    category: "TENER",
    questionEs: "Carlos ___ un coche nuevo y lo usa todos los días.",
    translationRu: "У Карлоса новая машина, и он использует её каждый день.",
    options: [
      { id: "A", text: "tengo" },
      { id: "B", text: "tienes" },
      { id: "C", text: "tiene" },
      { id: "D", text: "tienen" }
    ],
    correctAnswer: "C",
    explanation: "Carlos (он / él) -> форма 'tiene'."
  },
  {
    id: 3,
    category: "TENER",
    questionEs: "Nosotros ___ mucho trabajo esta tarde en la oficina.",
    translationRu: "Сегодня днём у нас много работы в офисе.",
    options: [
      { id: "A", text: "tenemos" },
      { id: "B", text: "tienen" },
      { id: "C", text: "tenéis" },
      { id: "D", text: "tiene" }
    ],
    correctAnswer: "A",
    explanation: "Nosotros (мы) -> форма 'tenemos'."
  },
  {
    id: 4,
    category: "TENER",
    questionEs: "¿Tú ___ una mochila grande para la escuela?",
    translationRu: "У тебя есть большой рюкзак для школы?",
    options: [
      { id: "A", text: "tengo" },
      { id: "B", text: "tiene" },
      { id: "C", text: "tienes" },
      { id: "D", text: "tenemos" }
    ],
    correctAnswer: "C",
    explanation: "Tú (ты) -> форма 'tienes'."
  },
  {
    id: 5,
    category: "TENER",
    questionEs: "Mis amigos ___ entradas para el concierto del sábado.",
    translationRu: "У моих друзей есть билеты на субботний концерт.",
    options: [
      { id: "A", text: "tiene" },
      { id: "B", text: "tienen" },
      { id: "C", text: "tenemos" },
      { id: "D", text: "tenéis" }
    ],
    correctAnswer: "B",
    explanation: "Mis amigos (они / ellos) -> форма 'tienen'."
  },
  {
    id: 6,
    category: "TENER",
    questionEs: "Ana ___ 16 años y estudia en una escuela grande.",
    translationRu: "Ане 16 лет, и она учится в большой школе.",
    options: [
      { id: "A", text: "tengo" },
      { id: "B", text: "tienes" },
      { id: "C", text: "tiene" },
      { id: "D", text: "tienen" }
    ],
    correctAnswer: "C",
    explanation: "Ana (она / ella) -> форма 'tiene'."
  },
  {
    id: 7,
    category: "TENER",
    questionEs: "Vosotros ___ una casa cerca del centro de la ciudad.",
    translationRu: "У вас есть дом недалеко от центра города.",
    options: [
      { id: "A", text: "tenéis" },
      { id: "B", text: "tienen" },
      { id: "C", text: "tenemos" },
      { id: "D", text: "tengo" }
    ],
    correctAnswer: "A",
    explanation: "Vosotros (вы) -> форма 'tenéis'."
  },
  {
    id: 8,
    category: "TENER",
    questionEs: "Yo ___ mucha sed después de hacer deporte.",
    translationRu: "Я очень хочу пить после занятий спортом.",
    options: [
      { id: "A", text: "tiene" },
      { id: "B", text: "tengo" },
      { id: "C", text: "tienes" },
      { id: "D", text: "tenemos" }
    ],
    correctAnswer: "B",
    explanation: "Yo -> tener sed -> 'tengo'."
  },
  {
    id: 9,
    category: "TENER",
    questionEs: "Pedro y Lucía ___ tres libros nuevos de español.",
    translationRu: "У Педро и Лусии есть три новые книги по испанскому.",
    options: [
      { id: "A", text: "tiene" },
      { id: "B", text: "tenéis" },
      { id: "C", text: "tienen" },
      { id: "D", text: "tenemos" }
    ],
    correctAnswer: "C",
    explanation: "Pedro y Lucía (ellos) -> форма 'tienen'."
  },
  {
    id: 10,
    category: "TENER",
    questionEs: "¿Cuántos hermanos ___ tu mejor amigo?",
    translationRu: "Сколько братьев и сестёр у твоего лучшего друга?",
    options: [
      { id: "A", text: "tienes" },
      { id: "B", text: "tiene" },
      { id: "C", text: "tienen" },
      { id: "D", text: "tengo" }
    ],
    correctAnswer: "B",
    explanation: "Tu mejor amigo (он / él) -> форма 'tiene'."
  },

  // 2. TENER QUE — 10 вопросов
  {
    id: 11,
    category: "TENER QUE",
    questionEs: "Yo ___ terminar este ejercicio antes de las seis.",
    translationRu: "Мне нужно закончить это упражнение до шести.",
    options: [
      { id: "A", text: "tiene que" },
      { id: "B", text: "tengo que" },
      { id: "C", text: "hay que" },
      { id: "D", text: "tienes que" }
    ],
    correctAnswer: "B",
    explanation: "Конструкция обязательства: Yo + tengo que + инфинитив."
  },
  {
    id: 12,
    category: "TENER QUE",
    questionEs: "Carlos ___ comprar pan, leche y fruta para la cena.",
    translationRu: "Карлосу нужно купить хлеб, молоко и фрукты на ужин.",
    options: [
      { id: "A", text: "tiene que" },
      { id: "B", text: "tengo que" },
      { id: "C", text: "tenemos que" },
      { id: "D", text: "tienen que" }
    ],
    correctAnswer: "A",
    explanation: "Carlos (он) -> 'tiene que'."
  },
  {
    id: 13,
    category: "TENER QUE",
    questionEs: "Nosotros ___ estudiar estas palabras para el examen de mañana.",
    translationRu: "Нам нужно выучить эти слова к завтрашнему экзамену.",
    options: [
      { id: "A", text: "tienes que" },
      { id: "B", text: "tenemos que" },
      { id: "C", text: "tienen que" },
      { id: "D", text: "tiene que" }
    ],
    correctAnswer: "B",
    explanation: "Nosotros -> 'tenemos que'."
  },
  {
    id: 14,
    category: "TENER QUE",
    questionEs: "¿Tú ___ llamar al profesor esta tarde?",
    translationRu: "Тебе нужно позвонить преподавателю сегодня днём?",
    options: [
      { id: "A", text: "tengo que" },
      { id: "B", text: "tienes que" },
      { id: "C", text: "tiene que" },
      { id: "D", text: "hay que" }
    ],
    correctAnswer: "B",
    explanation: "Tú -> 'tienes que'."
  },
  {
    id: 15,
    category: "TENER QUE",
    questionEs: "Los alumnos ___ escribir diez frases en español.",
    translationRu: "Ученикам нужно написать десять предложений на испанском.",
    options: [
      { id: "A", text: "tiene que" },
      { id: "B", text: "tienen que" },
      { id: "C", text: "tenemos que" },
      { id: "D", text: "tenéis que" }
    ],
    correctAnswer: "B",
    explanation: "Los alumnos (они) -> 'tienen que'."
  },
  {
    id: 16,
    category: "TENER QUE",
    questionEs: "María ___ tomar el autobús número 20 para ir al centro.",
    translationRu: "Марии нужно сесть на автобус №20, чтобы поехать в центр.",
    options: [
      { id: "A", text: "tiene que" },
      { id: "B", text: "tienes que" },
      { id: "C", text: "tengo que" },
      { id: "D", text: "tienen que" }
    ],
    correctAnswer: "A",
    explanation: "María (она) -> 'tiene que'."
  },
  {
    id: 17,
    category: "TENER QUE",
    questionEs: "Vosotros ___ llevar los libros a la biblioteca mañana.",
    translationRu: "Вам нужно завтра отнести книги в библиотеку.",
    options: [
      { id: "A", text: "tenéis que" },
      { id: "B", text: "tenemos que" },
      { id: "C", text: "tiene que" },
      { id: "D", text: "tienen que" }
    ],
    correctAnswer: "A",
    explanation: "Vosotros -> 'tenéis que'."
  },
  {
    id: 18,
    category: "TENER QUE",
    questionEs: "Yo ___ preparar una presentación para la clase del viernes.",
    translationRu: "Мне нужно подготовить презентацию к пятничному уроку.",
    options: [
      { id: "A", text: "tengo que" },
      { id: "B", text: "tiene que" },
      { id: "C", text: "hay que" },
      { id: "D", text: "tienen que" }
    ],
    correctAnswer: "A",
    explanation: "Yo -> 'tengo que'."
  },
  {
    id: 19,
    category: "TENER QUE",
    questionEs: "Pedro y Diego ___ salir de casa a las siete de la mañana.",
    translationRu: "Педро и Диего должны выйти из дома в семь утра.",
    options: [
      { id: "A", text: "tiene que" },
      { id: "B", text: "tienen que" },
      { id: "C", text: "tenemos que" },
      { id: "D", text: "tienes que" }
    ],
    correctAnswer: "B",
    explanation: "Pedro y Diego (они) -> 'tienen que'."
  },
  {
    id: 20,
    category: "TENER QUE",
    questionEs: "¿Qué ___ hacer hoy después de la escuela?",
    translationRu: "Что тебе нужно сделать сегодня после школы?",
    options: [
      { id: "A", text: "tienes" },
      { id: "B", text: "tienes que" },
      { id: "C", text: "hay" },
      { id: "D", text: "tiene que" }
    ],
    correctAnswer: "B",
    explanation: "Перед инфинитивом 'hacer' для второго лица (tú) требуется 'tienes que'."
  },

  // 3. HAY / HAY QUE — 10 вопросов
  {
    id: 21,
    category: "HAY / HAY QUE",
    questionEs: "En esta calle ___ dos supermercados y una farmacia.",
    translationRu: "На этой улице есть два супермаркета и одна аптека.",
    options: [
      { id: "A", text: "están" },
      { id: "B", text: "hay" },
      { id: "C", text: "tiene" },
      { id: "D", text: "es" }
    ],
    correctAnswer: "B",
    explanation: "Для констатации наличия неопределённых предметов используется безличная форма 'hay'."
  },
  {
    id: 22,
    category: "HAY / HAY QUE",
    questionEs: "En mi escuela ___ una biblioteca muy grande con muchos libros.",
    translationRu: "В моей школе есть очень большая библиотека с множеством книг.",
    options: [
      { id: "A", text: "hay" },
      { id: "B", text: "está" },
      { id: "C", text: "tiene" },
      { id: "D", text: "son" }
    ],
    correctAnswer: "A",
    explanation: "С неопределённым артиклем (una biblioteca) используется 'hay'."
  },
  {
    id: 23,
    category: "HAY / HAY QUE",
    questionEs: "Para aprender bien un idioma, ___ practicar todos los días.",
    translationRu: "Чтобы хорошо выучить язык, нужно практиковаться каждый день.",
    options: [
      { id: "A", text: "tiene que" },
      { id: "B", text: "hay" },
      { id: "C", text: "hay que" },
      { id: "D", text: "tenemos que" }
    ],
    correctAnswer: "C",
    explanation: "Безличное обязательство 'нужно делать что-то': 'hay que' + инфинитив."
  },
  {
    id: 24,
    category: "HAY / HAY QUE",
    questionEs: "En la nevera no ___ leche, pero sí hay queso.",
    translationRu: "В холодильнике нет молока, но есть сыр.",
    options: [
      { id: "A", text: "está" },
      { id: "B", text: "hay" },
      { id: "C", text: "tiene" },
      { id: "D", text: "están" }
    ],
    correctAnswer: "B",
    explanation: "Наличие/отсутствие неисчисляемого существительного (leche) -> 'no hay'."
  },
  {
    id: 25,
    category: "HAY / HAY QUE",
    questionEs: "Para llegar al museo desde aquí, ___ tomar el metro.",
    translationRu: "Чтобы добраться отсюда до музея, нужно сесть на метро.",
    options: [
      { id: "A", text: "hay que" },
      { id: "B", text: "hay" },
      { id: "C", text: "tiene que" },
      { id: "D", text: "tener" }
    ],
    correctAnswer: "A",
    explanation: "Безличное 'нужно / надо': 'hay que' + tomar."
  },
  {
    id: 26,
    category: "HAY / HAY QUE",
    questionEs: "¿___ un banco cerca de esta plaza?",
    translationRu: "Есть ли банк рядом с этой площадью?",
    options: [
      { id: "A", text: "Está" },
      { id: "B", text: "Tiene" },
      { id: "C", text: "Hay" },
      { id: "D", text: "Es" }
    ],
    correctAnswer: "C",
    explanation: "Вопрос о наличии какого-либо объекта: '¿Hay un banco...?'."
  },
  {
    id: 27,
    category: "HAY / HAY QUE",
    questionEs: "En el parque ___ muchos árboles y varios bancos.",
    translationRu: "В парке много деревьев и несколько скамеек.",
    options: [
      { id: "A", text: "tiene" },
      { id: "B", text: "están" },
      { id: "C", text: "hay" },
      { id: "D", text: "son" }
    ],
    correctAnswer: "C",
    explanation: "Наличие множества предметов -> безличная форма 'hay'."
  },
  {
    id: 28,
    category: "HAY / HAY QUE",
    questionEs: "Para escribir bien en español, ___ aprender las reglas básicas.",
    translationRu: "Чтобы хорошо писать по-испански, нужно выучить основные правила.",
    options: [
      { id: "A", text: "hay que" },
      { id: "B", text: "hay" },
      { id: "C", text: "tiene que" },
      { id: "D", text: "tenemos" }
    ],
    correctAnswer: "A",
    explanation: "Обобщённое правило/совет: 'hay que' + aprender."
  },
  {
    id: 29,
    category: "HAY / HAY QUE",
    questionEs: "En esta habitación ___ una mesa, dos sillas y una ventana.",
    translationRu: "В этой комнате есть стол, два стула и окно.",
    options: [
      { id: "A", text: "está" },
      { id: "B", text: "hay" },
      { id: "C", text: "tiene" },
      { id: "D", text: "están" }
    ],
    correctAnswer: "B",
    explanation: "Перечисление предметов в комнате -> 'hay'."
  },
  {
    id: 30,
    category: "HAY / HAY QUE",
    questionEs: "Antes de un examen importante, ___ estudiar con atención.",
    translationRu: "Перед важным экзаменом нужно внимательно заниматься.",
    options: [
      { id: "A", text: "hay" },
      { id: "B", text: "hay que" },
      { id: "C", text: "tiene" },
      { id: "D", text: "tener que" }
    ],
    correctAnswer: "B",
    explanation: "'hay que' выражает общее обязательство перед инфинитивом."
  },

  // 4. DÓNDE / ADÓNDE / DE DÓNDE — 10 вопросов
  {
    id: 31,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ vive tu amigo Carlos ahora?",
    translationRu: "Где сейчас живёт твой друг Карлос?",
    options: [
      { id: "A", text: "Adónde" },
      { id: "B", text: "De dónde" },
      { id: "C", text: "Dónde" },
      { id: "D", text: "Cuándo" }
    ],
    correctAnswer: "C",
    explanation: "Где (местонахождение / проживание) -> 'Dónde'."
  },
  {
    id: 32,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ vas después de terminar la clase?",
    translationRu: "Куда ты идёшь после окончания урока?",
    options: [
      { id: "A", text: "Dónde" },
      { id: "B", text: "Adónde" },
      { id: "C", text: "De dónde" },
      { id: "D", text: "Quién" }
    ],
    correctAnswer: "B",
    explanation: "Куда (направление с глаголом ir/vas) -> 'Adónde'."
  },
  {
    id: 33,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ es tu profesora de español?",
    translationRu: "Откуда твоя преподавательница испанского?",
    options: [
      { id: "A", text: "Dónde" },
      { id: "B", text: "Adónde" },
      { id: "C", text: "De dónde" },
      { id: "D", text: "Qué" }
    ],
    correctAnswer: "C",
    explanation: "Откуда (происхождение с глаголом ser/es) -> 'De dónde'."
  },
  {
    id: 34,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ está la parada del autobús número 15?",
    translationRu: "Где находится остановка автобуса №15?",
    options: [
      { id: "A", text: "De dónde" },
      { id: "B", text: "Dónde" },
      { id: "C", text: "Adónde" },
      { id: "D", text: "Cómo" }
    ],
    correctAnswer: "B",
    explanation: "Где находится объект (с глаголом estar) -> 'Dónde'."
  },
  {
    id: 35,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ vienen tus amigos cuando visitan esta ciudad?",
    translationRu: "Откуда приезжают твои друзья, когда посещают этот город?",
    options: [
      { id: "A", text: "De dónde" },
      { id: "B", text: "Dónde" },
      { id: "C", text: "Adónde" },
      { id: "D", text: "Cuándo" }
    ],
    correctAnswer: "A",
    explanation: "Откуда приезжают (с глаголом venir) -> 'De dónde'."
  },
  {
    id: 36,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ vais el próximo sábado por la mañana?",
    translationRu: "Куда вы идёте в следующую субботу утром?",
    options: [
      { id: "A", text: "De dónde" },
      { id: "B", text: "Dónde" },
      { id: "C", text: "Adónde" },
      { id: "D", text: "Cuál" }
    ],
    correctAnswer: "C",
    explanation: "Куда (направление с глаголом vais) -> 'Adónde'."
  },
  {
    id: 37,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ está el libro que compraste ayer?",
    translationRu: "Где находится книга, которую ты купил вчера?",
    options: [
      { id: "A", text: "Adónde" },
      { id: "B", text: "De dónde" },
      { id: "C", text: "Dónde" },
      { id: "D", text: "Por qué" }
    ],
    correctAnswer: "C",
    explanation: "Где находится книга -> 'Dónde está'."
  },
  {
    id: 38,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ sale este tren a las ocho?",
    translationRu: "Откуда отправляется этот поезд в восемь?",
    options: [
      { id: "A", text: "Dónde" },
      { id: "B", text: "De dónde" },
      { id: "C", text: "Adónde" },
      { id: "D", text: "Qué" }
    ],
    correctAnswer: "B",
    explanation: "Откуда отправляется поезд (исходная точка с salir) -> 'De dónde'."
  },
  {
    id: 39,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ quiere ir Ana durante las vacaciones?",
    translationRu: "Куда Ана хочет поехать во время каникул?",
    options: [
      { id: "A", text: "Adónde" },
      { id: "B", text: "Dónde" },
      { id: "C", text: "De dónde" },
      { id: "D", text: "Quién" }
    ],
    correctAnswer: "A",
    explanation: "Куда поехать (направление движения с ir) -> 'Adónde'."
  },
  {
    id: 40,
    category: "DÓNDE / ADÓNDE / DE DÓNDE",
    questionEs: "¿___ trabaja tu padre todos los días?",
    translationRu: "Где твой отец работает каждый день?",
    options: [
      { id: "A", text: "Adónde" },
      { id: "B", text: "Dónde" },
      { id: "C", text: "De dónde" },
      { id: "D", text: "Cuánto" }
    ],
    correctAnswer: "B",
    explanation: "Где работает (место действия) -> 'Dónde'."
  },

  // 5. ПРЕДЛОГИ МЕСТА — 15 вопросов
  {
    id: 41,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "El móvil está ___ la mesa, al lado del libro.",
    translationRu: "Телефон лежит на столе рядом с книгой.",
    options: [
      { id: "A", text: "encima de" },
      { id: "B", text: "debajo de" },
      { id: "C", text: "detrás de" },
      { id: "D", text: "entre" }
    ],
    correctAnswer: "A",
    explanation: "'encima de' означает 'на поверхности / сверху чего-то'."
  },
  {
    id: 42,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "El gato duerme ___ la silla porque hace mucho calor.",
    translationRu: "Кот спит под стулом, потому что очень жарко.",
    options: [
      { id: "A", text: "encima de" },
      { id: "B", text: "debajo de" },
      { id: "C", text: "delante de" },
      { id: "D", text: "dentro de" }
    ],
    correctAnswer: "B",
    explanation: "'debajo de' переводится как 'под'."
  },
  {
    id: 43,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "La farmacia está ___ el banco y el supermercado.",
    translationRu: "Аптека находится между банком и супермаркетом.",
    options: [
      { id: "A", text: "entre" },
      { id: "B", text: "encima de" },
      { id: "C", text: "detrás de" },
      { id: "D", text: "fuera de" }
    ],
    correctAnswer: "A",
    explanation: "'entre' означает 'между' двумя объектами."
  },
  {
    id: 44,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "El hotel está ___ la estación, al otro lado de la calle.",
    translationRu: "Отель находится напротив станции, на другой стороне улицы.",
    options: [
      { id: "A", text: "debajo de" },
      { id: "B", text: "enfrente de" },
      { id: "C", text: "dentro de" },
      { id: "D", text: "encima de" }
    ],
    correctAnswer: "B",
    explanation: "'enfrente de' переводится как 'напротив'."
  },
  {
    id: 45,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "Mi casa está ___ la escuela, solo a cinco minutos a pie.",
    translationRu: "Мой дом находится рядом со школой, всего в пяти минутах пешком.",
    options: [
      { id: "A", text: "lejos de" },
      { id: "B", text: "cerca de" },
      { id: "C", text: "detrás de" },
      { id: "D", text: "debajo de" }
    ],
    correctAnswer: "B",
    explanation: "'cerca de' означает 'близко / рядом'."
  },
  {
    id: 46,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "El aeropuerto está bastante ___ del centro de la ciudad.",
    translationRu: "Аэропорт находится довольно далеко от центра города.",
    options: [
      { id: "A", text: "cerca" },
      { id: "B", text: "lejos" },
      { id: "C", text: "dentro" },
      { id: "D", text: "delante" }
    ],
    correctAnswer: "B",
    explanation: "'lejos de' означает 'далеко от'."
  },
  {
    id: 47,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "Hay un autobús parado ___ la escuela.",
    translationRu: "Перед школой стоит автобус.",
    options: [
      { id: "A", text: "delante de" },
      { id: "B", text: "detrás de" },
      { id: "C", text: "debajo de" },
      { id: "D", text: "entre" }
    ],
    correctAnswer: "A",
    explanation: "'delante de' переводится как 'перед'."
  },
  {
    id: 48,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "El jardín está ___ la casa y no se ve desde la calle.",
    translationRu: "Сад находится за домом, и с улицы его не видно.",
    options: [
      { id: "A", text: "enfrente de" },
      { id: "B", text: "detrás de" },
      { id: "C", text: "encima de" },
      { id: "D", text: "entre" }
    ],
    correctAnswer: "B",
    explanation: "'detrás de' означает 'позади / за'."
  },
  {
    id: 49,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "Las llaves están ___ de la mochila.",
    translationRu: "Ключи находятся внутри рюкзака.",
    options: [
      { id: "A", text: "fuera" },
      { id: "B", text: "dentro" },
      { id: "C", text: "encima" },
      { id: "D", text: "detrás" }
    ],
    correctAnswer: "B",
    explanation: "'dentro de' означает 'внутри'."
  },
  {
    id: 50,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "El perro está ___ de la casa, en el jardín.",
    translationRu: "Собака находится снаружи дома, в саду.",
    options: [
      { id: "A", text: "dentro" },
      { id: "B", text: "fuera" },
      { id: "C", text: "debajo" },
      { id: "D", text: "encima" }
    ],
    correctAnswer: "B",
    explanation: "'fuera de' означает 'снаружи / вне'."
  },
  {
    id: 51,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "La cafetería está ___ la derecha de la biblioteca.",
    translationRu: "Кафе находится справа от библиотеки.",
    options: [
      { id: "A", text: "a" },
      { id: "B", text: "de" },
      { id: "C", text: "en" },
      { id: "D", text: "por" }
    ],
    correctAnswer: "A",
    explanation: "Устойчивое сочетание: 'a la derecha' (направо / справа)."
  },
  {
    id: 52,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "En el próximo cruce, gira ___ la izquierda.",
    translationRu: "На следующем перекрёстке поверни налево.",
    options: [
      { id: "A", text: "en" },
      { id: "B", text: "a" },
      { id: "C", text: "de" },
      { id: "D", text: "para" }
    ],
    correctAnswer: "B",
    explanation: "Устойчивое сочетание: 'a la izquierda' (налево / слева)."
  },
  {
    id: 53,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "Mañana voy ___ Barcelona con mis amigos.",
    translationRu: "Завтра я еду в Барселону с друзьями.",
    options: [
      { id: "A", text: "en" },
      { id: "B", text: "de" },
      { id: "C", text: "a" },
      { id: "D", text: "por" }
    ],
    correctAnswer: "C",
    explanation: "Направление движения с глаголом ir: 'ir a + город' -> 'voy a Barcelona'."
  },
  {
    id: 54,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "Este verano estamos ___ Madrid durante dos semanas.",
    translationRu: "Этим летом мы находимся в Мадриде две недели.",
    options: [
      { id: "A", text: "a" },
      { id: "B", text: "en" },
      { id: "C", text: "de" },
      { id: "D", text: "para" }
    ],
    correctAnswer: "B",
    explanation: "Местонахождение: 'estar en + город' -> 'estamos en Madrid'."
  },
  {
    id: 55,
    category: "ПРЕДЛОГИ МЕСТА",
    questionEs: "Mis amigos vienen ___ Valencia y llegan por la tarde.",
    translationRu: "Мои друзья приезжают из Валенсии и прибывают днём.",
    options: [
      { id: "A", text: "a" },
      { id: "B", text: "en" },
      { id: "C", text: "de" },
      { id: "D", text: "por" }
    ],
    correctAnswer: "C",
    explanation: "Движение из пункта: 'venir de + город' -> 'vienen de Valencia'."
  },

  // 6. GUSTAR — 10 вопросов
  {
    id: 56,
    category: "GUSTAR",
    questionEs: "A mí me ___ mucho esta película española.",
    translationRu: "Мне очень нравится этот испанский фильм.",
    options: [
      { id: "A", text: "gustan" },
      { id: "B", text: "gusta" },
      { id: "C", text: "gusto" },
      { id: "D", text: "gustas" }
    ],
    correctAnswer: "B",
    explanation: "'esta película' — единственное число, поэтому форма глагола 'gusta'."
  },
  {
    id: 57,
    category: "GUSTAR",
    questionEs: "A Carlos le ___ los deportes y los juegos de equipo.",
    translationRu: "Карлосу нравятся спортивные игры и командные виды спорта.",
    options: [
      { id: "A", text: "gusta" },
      { id: "B", text: "gustan" },
      { id: "C", text: "gustas" },
      { id: "D", text: "gustamos" }
    ],
    correctAnswer: "B",
    explanation: "'los deportes' — множественное число, поэтому глагол 'gustan'."
  },
  {
    id: 58,
    category: "GUSTAR",
    questionEs: "A Ana ___ gusta estudiar idiomas extranjeros.",
    translationRu: "Ане нравится изучать иностранные языки.",
    options: [
      { id: "A", text: "me" },
      { id: "B", text: "te" },
      { id: "C", text: "le" },
      { id: "D", text: "nos" }
    ],
    correctAnswer: "C",
    explanation: "Для третьего лица ед. ч. (A Ana / él / ella) местоимение — 'le'."
  },
  {
    id: 59,
    category: "GUSTAR",
    questionEs: "A nosotros ___ gustan mucho los restaurantes españoles.",
    translationRu: "Нам очень нравятся испанские рестораны.",
    options: [
      { id: "A", text: "les" },
      { id: "B", text: "nos" },
      { id: "C", text: "os" },
      { id: "D", text: "le" }
    ],
    correctAnswer: "B",
    explanation: "Для первого лица мн. ч. (A nosotros) используется 'nos'."
  },
  {
    id: 60,
    category: "GUSTAR",
    questionEs: "¿___ gusta escuchar música por la tarde?",
    translationRu: "Тебе нравится слушать музыку днём?",
    options: [
      { id: "A", text: "Me" },
      { id: "B", text: "Te" },
      { id: "C", text: "Le" },
      { id: "D", text: "Nos" }
    ],
    correctAnswer: "B",
    explanation: "Вопрос к 'ты' (tú) требует косвенного местоимения 'Te'."
  },
  {
    id: 61,
    category: "GUSTAR",
    questionEs: "A Pedro y Lucía ___ gustan las películas de aventuras.",
    translationRu: "Педро и Лусии нравятся приключенческие фильмы.",
    options: [
      { id: "A", text: "le" },
      { id: "B", text: "les" },
      { id: "C", text: "nos" },
      { id: "D", text: "te" }
    ],
    correctAnswer: "B",
    explanation: "A Pedro y Lucía (им / ellos) -> местоимение 'les'."
  },
  {
    id: 62,
    category: "GUSTAR",
    questionEs: "A mí no ___ gusta el café muy fuerte.",
    translationRu: "Мне не нравится очень крепкий кофе.",
    options: [
      { id: "A", text: "me" },
      { id: "B", text: "te" },
      { id: "C", text: "le" },
      { id: "D", text: "les" }
    ],
    correctAnswer: "A",
    explanation: "A mí -> местоимение 'me'."
  },
  {
    id: 63,
    category: "GUSTAR",
    questionEs: "¿Os ___ los libros de historia?",
    translationRu: "Вам нравятся книги по истории?",
    options: [
      { id: "A", text: "gusta" },
      { id: "B", text: "gustan" },
      { id: "C", text: "gustáis" },
      { id: "D", text: "gusto" }
    ],
    correctAnswer: "B",
    explanation: "Подлежащее 'los libros' во множественном числе -> 'gustan'."
  },
  {
    id: 64,
    category: "GUSTAR",
    questionEs: "A mi hermano le ___ mucho jugar al fútbol con sus amigos.",
    translationRu: "Моему брату очень нравится играть в футбол с друзьями.",
    options: [
      { id: "A", text: "gustan" },
      { id: "B", text: "gusta" },
      { id: "C", text: "gustas" },
      { id: "D", text: "gusto" }
    ],
    correctAnswer: "B",
    explanation: "С инфинитивом ('jugar') глагол gustar всегда употребляется в ед. ч. -> 'gusta'."
  },
  {
    id: 65,
    category: "GUSTAR",
    questionEs: "A mis padres no les ___ las películas muy largas.",
    translationRu: "Моим родителям не нравятся очень длинные фильмы.",
    options: [
      { id: "A", text: "gusta" },
      { id: "B", text: "gustan" },
      { id: "C", text: "gustamos" },
      { id: "D", text: "gustáis" }
    ],
    correctAnswer: "B",
    explanation: "'las películas' во мн. ч. -> глагол 'gustan'."
  },

  // 7. ЧИСЛИТЕЛЬНЫЕ — NÚMEROS — 15 вопросов
  {
    id: 66,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Cómo se escribe correctamente el número 18 en español?",
    translationRu: "Как правильно пишется число 18 по-испански?",
    options: [
      { id: "A", text: "dieciocho" },
      { id: "B", text: "diez y ocho" },
      { id: "C", text: "diez-ocho" },
      { id: "D", text: "ochodiez" }
    ],
    correctAnswer: "A",
    explanation: "Числа от 16 до 29 пишутся слитно: dieciocho."
  },
  {
    id: 67,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "En una clase hay 21 alumnos. ¿Cómo se dice «21 alumnos»?",
    translationRu: "В классе 21 ученик. Как сказать «21 ученик»?",
    options: [
      { id: "A", text: "veintiuno alumnos" },
      { id: "B", text: "veintiún alumnos" },
      { id: "C", text: "veinte uno alumnos" },
      { id: "D", text: "veinte y un alumnos" }
    ],
    correctAnswer: "B",
    explanation: "Перед существительным мужского рода veintiuno сокращается до 'veintiún'."
  },
  {
    id: 68,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Cómo se dice correctamente «37»?",
    translationRu: "Как правильно сказать «37»?",
    options: [
      { id: "A", text: "treinta siete" },
      { id: "B", text: "treinta y siete" },
      { id: "C", text: "tres y siete" },
      { id: "D", text: "treinta con siete" }
    ],
    correctAnswer: "B",
    explanation: "Начиная с 31, десятки и единицы соединяются союзом 'y': 'treinta y siete'."
  },
  {
    id: 69,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "El libro cuesta 48 euros. ¿Cómo se dice «48»?",
    translationRu: "Книга стоит 48 евро. Как сказать «48»?",
    options: [
      { id: "A", text: "cuarenta y ocho" },
      { id: "B", text: "cuatro y ocho" },
      { id: "C", text: "cuarenta ocho" },
      { id: "D", text: "ochenta y cuatro" }
    ],
    correctAnswer: "A",
    explanation: "48 -> 'cuarenta y ocho'."
  },
  {
    id: 70,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Qué número corresponde a «sesenta y tres»?",
    translationRu: "Какое число соответствует «sesenta y tres»?",
    options: [
      { id: "A", text: "36" },
      { id: "B", text: "63" },
      { id: "C", text: "73" },
      { id: "D", text: "60" }
    ],
    correctAnswer: "B",
    explanation: "Sesenta = 60, tres = 3 -> 63."
  },
  {
    id: 71,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Cómo se dice correctamente «75» en español?",
    translationRu: "Как правильно сказать «75» по-испански?",
    options: [
      { id: "A", text: "setenta cinco" },
      { id: "B", text: "setenta y cinco" },
      { id: "C", text: "siete y cinco" },
      { id: "D", text: "cincuenta y siete" }
    ],
    correctAnswer: "B",
    explanation: "Setenta (70) + y + cinco (5) = 'setenta y cinco'."
  },
  {
    id: 72,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Qué número es «ochenta y nueve»?",
    translationRu: "Какое число означает «ochenta y nueve»?",
    options: [
      { id: "A", text: "98" },
      { id: "B", text: "89" },
      { id: "C", text: "79" },
      { id: "D", text: "88" }
    ],
    correctAnswer: "B",
    explanation: "Ochenta = 80, nueve = 9 -> 89."
  },
  {
    id: 73,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "La escuela tiene 100 alumnos. ¿Cómo se dice «100»?",
    translationRu: "В школе 100 учеников. Как сказать «100»?",
    options: [
      { id: "A", text: "cien" },
      { id: "B", text: "ciento" },
      { id: "C", text: "mil" },
      { id: "D", text: "diez cientos" }
    ],
    correctAnswer: "A",
    explanation: "Ровно 100 перед существительным или самостоятельно — это 'cien'."
  },
  {
    id: 74,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "En la biblioteca hay 101 libros. ¿Cómo se dice «101»?",
    translationRu: "В библиотеке 101 книга. Как сказать «101»?",
    options: [
      { id: "A", text: "cien uno" },
      { id: "B", text: "ciento uno" },
      { id: "C", text: "cien y uno" },
      { id: "D", text: "ciento y uno" }
    ],
    correctAnswer: "B",
    explanation: "Больше 100 используется основа 'ciento': 'ciento uno' (или 'ciento un libros')."
  },
  {
    id: 75,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Cómo se dice correctamente «250»?",
    translationRu: "Как правильно сказать «250»?",
    options: [
      { id: "A", text: "doscientos cincuenta" },
      { id: "B", text: "dos cientos cincuenta" },
      { id: "C", text: "doscientos y cincuenta" },
      { id: "D", text: "ciento cincuenta" }
    ],
    correctAnswer: "A",
    explanation: "200 = doscientos (пишется слитно), 50 = cincuenta. Без союза 'y' между сотнями и десятками."
  },
  {
    id: 76,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Qué número corresponde a «cuatrocientos treinta»?",
    translationRu: "Какое число соответствует «cuatrocientos treinta»?",
    options: [
      { id: "A", text: "403" },
      { id: "B", text: "430" },
      { id: "C", text: "340" },
      { id: "D", text: "4003" }
    ],
    correctAnswer: "B",
    explanation: "Cuatrocientos = 400, treinta = 30 -> 430."
  },
  {
    id: 77,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Cómo se dice «700» correctamente?",
    translationRu: "Как правильно сказать «700»?",
    options: [
      { id: "A", text: "sietecientos" },
      { id: "B", text: "setecientos" },
      { id: "C", text: "setenta cientos" },
      { id: "D", text: "siete cien" }
    ],
    correctAnswer: "B",
    explanation: "700 — исключение в испанском языке: 'setecientos' (а не sietecientos)."
  },
  {
    id: 78,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "En una ciudad viven 1 000 personas. ¿Cómo se dice «1 000»?",
    translationRu: "В городе живёт 1000 человек. Как сказать «1000»?",
    options: [
      { id: "A", text: "un mil" },
      { id: "B", text: "uno mil" },
      { id: "C", text: "mil" },
      { id: "D", text: "cien mil" }
    ],
    correctAnswer: "C",
    explanation: "1000 в испанском языке говорится просто 'mil', без артикля 'un'."
  },
  {
    id: 79,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Cómo se dice correctamente «3 245»?",
    translationRu: "Как правильно сказать «3245»?",
    options: [
      { id: "A", text: "tres mil doscientos cuarenta y cinco" },
      { id: "B", text: "tres mil doscientos y cuarenta cinco" },
      { id: "C", text: "tres cientos mil cuarenta y cinco" },
      { id: "D", text: "tres mil veinte y cuarenta y cinco" }
    ],
    correctAnswer: "A",
    explanation: "3000 (tres mil) + 200 (doscientos) + 45 (cuarenta y cinco)."
  },
  {
    id: 80,
    category: "ЧИСЛИТЕЛЬНЫЕ",
    questionEs: "¿Qué número es «doce mil seiscientos treinta y uno»?",
    translationRu: "Какое число означает «doce mil seiscientos treinta y uno»?",
    options: [
      { id: "A", text: "12 361" },
      { id: "B", text: "12 631" },
      { id: "C", text: "126 031" },
      { id: "D", text: "12 613" }
    ],
    correctAnswer: "B",
    explanation: "Doce mil (12 000) + seiscientos (600) + treinta y uno (31) = 12 631."
  }
];
