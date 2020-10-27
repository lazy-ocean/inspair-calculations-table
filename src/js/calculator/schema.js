export default {
  ProjectPrice: {
    label: "Project cost,&nbsp₽",
    placeholder: 0,
    type: "range",
    required: true,
    min: 1000000,
    max: 50000000,
    // TEST
    value: 8400000,
    step: 100000,
  },
  FiredEmployees: {
    label: "Dismissed employees",
    placeholder: 0,
    type: "range",
    min: 1,
    max: 20,
    required: true,
    // TEST
    value: 4,
  },
  Robots: {
    label: "Project robots",
    placeholder: 0,
    type: "range",
    min: 1,
    max: 5,
    required: true,
    // TEST
    value: 1,
  },
  Performance: {
    label: "Productive capacity increase,&nbsp%",
    placeholder: 0,
    type: "range",
    required: true,
    min: 0,
    max: 100,
    // TEST
    value: 0,
  },
  Shifts: {
    label: "Shifts&nbsp;per&nbsp;day (12&nbsp;hours)",
    placeholder: 0,
    type: "range",
    required: true,
    min: 0,
    max: 4,
    // TEST
    value: 2,
  },
  WorkingDays: {
    label: "Working days in&nbsp;a&nbsp;week",
    placeholder: 0,
    type: "range",
    required: true,
    min: 1,
    max: 7,
    // TEST
    value: 7,
  },
  CostsPerPerson: {
    label: "Costs per employee (including tax),&nbsp₽/year",
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
    label: "Savings (working suits, trainings, etc),&nbsp;₽/year",
    placeholder: 0,
    type: "range",
    required: true,
    min: 10000,
    max: 1000000,
    // TEST
    value: 10000,
    step: 1000,
  },
};
