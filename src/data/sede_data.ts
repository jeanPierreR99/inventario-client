//sede
//oficina general
//oficina
//unidad

export interface Office {
  name: string;
  segments?: string[];
  units?: string[];
}

export interface GeneralOffice {
  name: string;
  offices?: Office[];
}

export interface Sede {
  name: string;
  generalOffices?: GeneralOffice[];
}

export const sedeData = [
  {
    name: "PALACIO MUNICIPAL",
    generalOffices: [
      {
        name: "CONCEJO MUNICIPAL",
        offices: [],
      },
      {
        name: "SUBGERENCIA DE MEDIO AMBIENTE",
        offices: [],
      },
      {
        name: "OFICINA DE PROCURADURIA",
        offices: [],
      },
      {
        name: "OFICINA DE ALMACÉN CENTRAL",
        offices: [],
      },
      {
        name: "ALCALDÍA",
        offices: [
          {
            name: "ALCALDÍA - OFICINA PRINCIPAL",
          },
          {
            name: "SECRETARÍA GENERAL",
            units: [
              "OFICINA DE TRÁMITE DOCUMENTARIO",
              "DEPARTAMENTO DE ARCHIVO CENTRAL (SEM LORETO)",
            ],
          },
        ],
      },
      {
        name: "GERENCIA MUNICIPAL",
        offices: [
          {
            name: "GERENCIA MUNICIPAL - OFICINA PRINCIPAL",
          },
          {
            name: "OFICINA DE IMAGEN INSTITUCIONAL",
          },
        ],
      },
      {
        name: "OFICINA GENERAL DE ASESORÍA JURÍDICA",
        offices: [],
      },
      {
        name: "OFICINA GENERAL DE PLANEAMIENTO Y PRESUPUESTO",
        offices: [
          {
            name: "OFICINA GENERAL DE PLANEAMIENTO Y PRESUPUESTO - OFICINA PRINCIPAL",
            segments: ["172.14.1", "100", "110"],
          },
          {
            name: "OFICINA DE PLANEAMIENTO Y Y MODERNIZACIÓN",
          },
          {
            name: "UNIDAD DE PRESUPUESTO",
            segments: ["172.14.1", "111", "120"],
          },
          {
            name: "OFICINA DE PROGRAMACIÓN MULTIANUAL DE INVERSIONES",
            segments: ["172.14.1", "131", "140"],
          },
          {
            name: "OFICINA DE TECNOLOGÍAS DE LA INFORMACIÓN",
          },
          {
            name: "OFICINA DE FORMULACIÓN Y EVALUACIÓN DE INVERSIONES",
            segments: ["172.14.1", "141", "170"],
          },
        ],
      },
      {
        name: "OFICINA GENERAL DE ADMINSITRACIÓN Y FINANZAS",
        offices: [
          {
            name: "OFICINA GENERAL DE ADMINISTRACIÓN Y FINANZAS - OFICINA PRINCIPAL",
            segments: ["172.14.1", "41", "60"],
          },
          {
            name: "OFICINA DE PERSONAL",
            units: ["UNIDAD FUNCIONAL DE REMUNERACIONES"],
          },
          {
            name: "OFICINA DE TESORERIA",
          },
          {
            name: "OFICINA DE CONTABILIDAD",
          },
          {
            name: "OFICINA DE ABASTECIMIENTO",
            units: [
              "UNIDAD FUNCIONAL DE ALMACÉN",
              "UNIDAD FUNCIONAL DE CONTRATACIONES Y ADQUISICIONES",
            ],
          },
          {
            name: "UNIDAD FUNCIONAL DE PATRIMONIO",
          },
        ],
      },
      {
        name: "GERENCIA DE DESARROLLO URBANO Y RURAL",
        offices: [
          {
            name: "GERENCIA DE DESARROLLO URBANO Y RURAL - OFICINA PRINCIPAL",
            segments: ["172.14.1", "180", "190"],
          },
          {
            name: "SUBGERENCIA DE PLANEAMIENTO Y ACONDICIONAMIENTO TERRITORIAL",
            segments: ["172.14.1", "191", "230"],
          },
          {
            name: "SUBGERENCIA DE CATASTRO",
            segments: ["172.14.1", "231", "250"],
          },
          {
            name: "SUBGERENCIA DE OBRAS (SERENAZGO)",
          },
          {
            name: "SUBGERENCIA DE ESTUDIOS Y PROYECTOS DE INVERSIÓN (SERENZAGO)",
          },
          {
            name: "SUBGERENCIA DE SUPERVISIÓN Y LIQUIDACIÓN DE OBRAS (SERENAZGO)",
          },
          {
            name: "SUBGERENCIA DE OPERACIONES DE VÍAS URBANAS  Y RURALES Y DE DERENAJE PLUVIAL (SEM CHAPAJAL)",
            units: ["UNIDAD DE GESTIÓN DE DRENAJE PLUVIAL"],
          },
        ],
      },
      {
        name: "GERENCIA DE RENTAS Y ADMINISTRACIÓN TRIBUTARIA",
        offices: [
          {
            name: "GERENCIA DE RENTAS Y ADMINISTRACIÓN TRIBUTARIA - OFICINA PRINCIPAL",
            segments: ["172.12.1", "130", "149"],
          },
          {
            name: "SUBGERENCIA DE REGISTRO Y CONTROL TRIBUTARIO",
          },
          {
            name: "SUBGERENCIA DE RECAUDACIÓN",
            segments: ["172.12.1", "150", "189"],
          },
          {
            name: "SUBGERENCIA DE FISCALIZACIÓN TRIBUTARIA",
            segments: ["172.12.1", "190", "219"],
          },
          {
            name: "SUBGERENCIA DE EJECUTORÍA COACTIVA",
            segments: ["172.12.1", "220", "240"],
          },
        ],
      },
      {
        name: "SUBGERENCIA DE COMUNIDADES NATIVAS Y PARTICIPACIÓN CIUDADANA",
        offices: [],
      },
      {
        name: "ORGANO DE CONTROL INSTITUCIONAL",
        offices: [],
      },
      {
        name: "SALA DE REGIDORES",
        offices: [],
      },
    ],
  },
  {
    name: "EX CAMARA DE COMERCIO",
    generalOffices: [
      {
        name: "GERENCIA DE DESARROLLO ECONÓMICO LOCAL",
        offices: [
          {
            name: "GERENCIA DE DESARROLLO ECONÓMICO LOCAL - OFICINA PRINCIPAL",
          },
          {
            name: "SUBGERENCIA DE PROMOCIÓN EMPRESARIAL Y COMERCIALIZACIÓN",
          },
          {
            name: "SUBGERENCIA DE TURISMO",
          },
          {
            name: "SUBGERENCIA DE OPERACIONES Y FISCALIZACIÓN",
          },
          {
            name: "SUBGERENCIA DE SANCIONES Y CONTROL",
          },
        ],
      },
    ],
  },
  {
    name: "BIBLIOTECA MUNICIPAL",
    generalOffices: [
      {
        name: "GERENCIA DE DESARROLLO SOCIAL",
        offices: [
          {
            name: "GERENCIA DE DESARROLLO SOCIAL - OFICINA PRINCIPAL",
          },
          {
            name: "SUBGERENCIA DE PROGRAMAS SOCIALES (VASO DE LECHE)",
            units: [
              "DEFENSORÍA MUNICIPAL DEL NIÑO Y DEL ADOLESCENTE - DEMUNA (EX MAMAVISHI)",
              "OFICINA MUNICIPAL DE ATENCIÓN A LAS PERSONAS CON DISCAPACIDAD - OMAPED",
              "CENTRO INTEGRAL DE ATENCIÓN AL ADULTO MAYOR - CIAAM",
              "UNIDAD LOCAL DE EMPADRONAMIENTO",
            ],
          },
          {
            name: "SUBGERENCIA DE EDUCACIÓN CULTURA Y DEPORTE (PISCINA MUNICIPAL)",
          },
          {
            name: "OFICINA DE REGISTRO CIVIL",
          },
          {
            name: "SUBGERENCIA DE SALUD Y SALUBRIDAD",
          },
          {
            name: "COMPROMISO",
          },
        ],
      },
    ],
  },
  {
    name: "SEM LORETO",
    generalOffices: [
      {
        name: "GERENCIA DE GESTIÓN AMBIENTAL",
        offices: [
          {
            name: "GERENCIA DE GESTIÓN AMBIENTAL - OFICINA PRINCIPAL",
          },
          {
            name: "SUBGERENCIA DE MEDIO AMBIENTE (PALACIO MUNICIPAL)",
            units: [
              "ÁREA TECNICA MUNICIPAL - ATM",
              "UNIDAD FUNCIONAL DE EXTRACCIPON Y CONTROL",
            ],
          },
          {
            name: "SUBGERENCIA DE ORNATO PARQUES Y JARDINES",
          },
          {
            name: "UNDIAD DE GESTIÓN DE RESIDUOS SÓLIDOS",
          },
          {
            name: "ARCHIVO CENTRAL",
          },
          {
            name: "ALMACÉN - UGRS",
          },
        ],
      },
    ],
  },
  {
    name: "INSTITUTO VIAL PROVINCIAL",
  },
  {
    name: "SERENAZGO",
    generalOffices: [
      {
        name: "GERENCIA DE SEGURIDAD CIUDADANA Y GESTIÓN DE RIESGO",
        offices: [
          {
            name: "GERENCIA DE SEGURIDAD CIUDADANA Y GESTIÓN DE RIESGO - OFICINA PRINCIPAL",
          },
          {
            name: "SUBGERENCIA DE SEGURIDAD VIAL Y TRÁNSITO",
          },
          {
            name: "SUBGERENCIA DE SERENAZGO",
          },
          {
            name: "SUBGERENCIA DE GESTIÓN DE RIESGO Y DE DESASTRES (EX MAMAVISHI)",
          },
          {
            name: "SUBGERENCIA DE OBRAS",
          },
          {
            name: "SUBGERENCIA DE SUPERVISIÓN",
          },
          {
            name: "SUBGERENCIA DE ESTUDIOS",
          },
        ],
      },
    ],
  },
  {
    name: "MAMAVISHI",
  },
  {
    name: "EX MAMAVISHI",
    generalOffices: [
      {
        name: "SUBGERENCIA DE GESTIÓN DE RIESGO Y DE DESASTRES",
        offices: [],
      },
      {
        name: "DEMUNA",
      },
    ],
  },
  {
    name: "CASA HOGAR",
  },
  {
    name: "VASO DE LECHE",
  },
  {
    name: "OFICINA MUNICAPL DE ATENCIÓN A LAS PERSONAS CON DISCAPACIDAD - OMAPED",
  },
  {
    name: "CENTRO INTEGRAL DEL ADULTO MAYOR - CIAM",
  },
  {
    name: "UNIDAD LOCAL DE EMPADRONAMIENTO - ULE",
  },
  {
    name: "SEM CHAPAJAL",
  },
];
