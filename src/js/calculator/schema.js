export default {
  ProjectPrice: {
    label: "Стоимость проекта,&nbsp₽",
    placeholder: 0,
    type: "range",
    required: true,
    min: 1000000,
    max: 50000000,
    // TEST
    value: 8400000,
    step: 1000,
  },
  FiredEmployees: {
    label: "Количество высвобождаемых работников",
    placeholder: 0,
    type: "range",
    min: 1,
    max: 20,
    required: true,
    // TEST
    value: 4,
  },
  Robots: {
    label: "Количество роботов в&nbsp;проекте",
    placeholder: 0,
    type: "range",
    min: 1,
    max: 5,
    required: true,
    // TEST
    value: 1,
  },
  Performance: {
    label: "Ожидаемый прирост производительности,&nbsp%",
    placeholder: 0,
    type: "range",
    required: true,
    min: 0,
    max: 100,
    // TEST
    value: 0,
  },
  Shifts: {
    label: "Количество смен в&nbsp;сутки (по&nbsp;8&nbsp;часов)",
    placeholder: 0,
    type: "range",
    required: true,
    min: 0,
    max: 3,
    // TEST
    value: 2,
  },
  WorkingDays: {
    label: "Количество рабочих дней в&nbsp;неделю",
    placeholder: 0,
    type: "range",
    required: true,
    min: 1,
    max: 7,
    // TEST
    value: 7,
  },
  CostsPerPerson: {
    label: "Затраты на человека на линии в год (с учетом налогов),&nbsp₽/год",
    placeholder: 0,
    type: "range",
    required: true,
    min: 420000,
    max: 1500000,
    // TEST
    value: 561168,
    step: 1000,
  },
  Savings: {
    label:
      "Дополнительная экономия (защитные костюмы, аттестации и&nbsp;пр.),&nbsp;₽/год",
    placeholder: 0,
    type: "range",
    required: true,
    min: 10000,
    max: 100000,
    // TEST
    value: 10000,
    step: 1000,
  },
};
