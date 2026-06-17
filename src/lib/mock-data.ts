import type { Solicitacao } from "@/lib/domain"

export const SOLICITACOES: Solicitacao[] = [
  {
    id: "1",
    numero: "00001",
    fornecedor: "Eletrosul Montagens Ltda",
    cnpj: "12.345.678/0001-90",
    valorTotal: 184320.5,
    dataSolicitacao: "2026-06-16T09:12:00",
    status: "PENDENTE",
    notas: [
      { numero: "NF-87421", valor: 62100.0, vencimento: "2026-07-15" },
      { numero: "NF-87422", valor: 58220.5, vencimento: "2026-07-22" },
      { numero: "NF-87455", valor: 64000.0, vencimento: "2026-08-01" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Eletrosul Montagens Ltda",
        data: "2026-06-16T09:12:00",
      },
    ],
  },
  {
    id: "2",
    numero: "00002",
    fornecedor: "Construtora Vale Verde S.A.",
    cnpj: "98.765.432/0001-10",
    valorTotal: 47800,
    dataSolicitacao: "2026-06-16T08:47:00",
    status: "PENDENTE",
    notas: [{ numero: "NF-30188", valor: 47800, vencimento: "2026-07-10" }],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Construtora Vale Verde S.A.",
        data: "2026-06-16T08:47:00",
      },
    ],
  },
  {
    id: "3",
    numero: "00003",
    fornecedor: "TecnoServ Manutenção Elétrica",
    cnpj: "23.456.789/0001-01",
    valorTotal: 312045.9,
    dataSolicitacao: "2026-06-15T17:30:00",
    status: "PENDENTE",
    notas: [
      { numero: "NF-55012", valor: 120000.0, vencimento: "2026-07-18" },
      { numero: "NF-55013", valor: 92045.9, vencimento: "2026-07-25" },
      { numero: "NF-55090", valor: 100000.0, vencimento: "2026-08-05" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "TecnoServ Manutenção Elétrica",
        data: "2026-06-15T17:30:00",
      },
    ],
  },
  {
    id: "4",
    numero: "00004",
    fornecedor: "Metalúrgica Pampa Ltda",
    cnpj: "34.567.890/0001-12",
    valorTotal: 96150,
    dataSolicitacao: "2026-06-15T14:05:00",
    status: "PENDENTE",
    notas: [
      { numero: "NF-11200", valor: 48075, vencimento: "2026-07-12" },
      { numero: "NF-11201", valor: 48075, vencimento: "2026-07-19" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Metalúrgica Pampa Ltda",
        data: "2026-06-15T14:05:00",
      },
    ],
  },
  {
    id: "5",
    numero: "00005",
    fornecedor: "Redes & Postes Engenharia",
    cnpj: "45.678.901/0001-23",
    valorTotal: 228900.75,
    dataSolicitacao: "2026-06-15T11:20:00",
    status: "APROVADA",
    notas: [
      { numero: "NF-77001", valor: 114450.75, vencimento: "2026-07-20" },
      { numero: "NF-77002", valor: 60000.0, vencimento: "2026-07-28" },
      { numero: "NF-77010", valor: 54450.0, vencimento: "2026-08-03" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Redes & Postes Engenharia",
        data: "2026-06-15T11:20:00",
      },
      {
        rotulo: "Solicitação aprovada",
        ator: "Operador CEMIG",
        data: "2026-06-15T15:42:00",
      },
    ],
  },
  {
    id: "6",
    numero: "00006",
    fornecedor: "Sul Transmissão Serviços Ltda",
    cnpj: "56.789.012/0001-34",
    valorTotal: 32400,
    dataSolicitacao: "2026-06-14T16:48:00",
    status: "REPROVADA",
    notas: [{ numero: "NF-44120", valor: 32400, vencimento: "2026-07-09" }],
    motivoReprovacao:
      "Nota com divergência de valor frente ao pedido de compra registrado no ERP. Reenvie após a correção.",
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Sul Transmissão Serviços Ltda",
        data: "2026-06-14T16:48:00",
      },
      {
        rotulo: "Solicitação reprovada",
        ator: "Operador CEMIG",
        data: "2026-06-14T18:10:00",
      },
    ],
  },
  {
    id: "7",
    numero: "00007",
    fornecedor: "Eletrosul Montagens Ltda",
    cnpj: "12.345.678/0001-90",
    valorTotal: 71250,
    dataSolicitacao: "2026-06-14T10:15:00",
    status: "APROVADA",
    notas: [
      { numero: "NF-87330", valor: 35625, vencimento: "2026-07-08" },
      { numero: "NF-87331", valor: 35625, vencimento: "2026-07-16" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Eletrosul Montagens Ltda",
        data: "2026-06-14T10:15:00",
      },
      {
        rotulo: "Solicitação aprovada",
        ator: "Operador CEMIG",
        data: "2026-06-14T11:50:00",
      },
    ],
  },
  {
    id: "8",
    numero: "00008",
    fornecedor: "Hidro Obras Civis Ltda",
    cnpj: "67.890.123/0001-45",
    valorTotal: 158600.4,
    dataSolicitacao: "2026-06-13T15:02:00",
    status: "PENDENTE",
    notas: [
      { numero: "NF-90011", valor: 80000.0, vencimento: "2026-07-14" },
      { numero: "NF-90012", valor: 78600.4, vencimento: "2026-07-21" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Hidro Obras Civis Ltda",
        data: "2026-06-13T15:02:00",
      },
    ],
  },
  {
    id: "9",
    numero: "00009",
    fornecedor: "Cabos & Conexões do Sul S.A.",
    cnpj: "78.901.234/0001-56",
    valorTotal: 410780,
    dataSolicitacao: "2026-06-13T09:40:00",
    status: "REPROVADA",
    notas: [
      { numero: "NF-22045", valor: 205390, vencimento: "2026-07-30" },
      { numero: "NF-22046", valor: 205390, vencimento: "2026-08-06" },
    ],
    motivoReprovacao:
      "Limite de antecipação do fornecedor para o mês já atingido. Nova solicitação a partir do próximo ciclo.",
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Cabos & Conexões do Sul S.A.",
        data: "2026-06-13T09:40:00",
      },
      {
        rotulo: "Solicitação reprovada",
        ator: "Operador CEMIG",
        data: "2026-06-13T10:25:00",
      },
    ],
  },
  {
    id: "10",
    numero: "00010",
    fornecedor: "Subestações Brasil Engenharia",
    cnpj: "89.012.345/0001-67",
    valorTotal: 88900,
    dataSolicitacao: "2026-06-12T13:25:00",
    status: "APROVADA",
    notas: [
      { numero: "NF-65001", valor: 44450, vencimento: "2026-07-11" },
      { numero: "NF-65002", valor: 44450, vencimento: "2026-07-19" },
    ],
    historico: [
      {
        rotulo: "Solicitação enviada",
        ator: "Subestações Brasil Engenharia",
        data: "2026-06-12T13:25:00",
      },
      {
        rotulo: "Solicitação aprovada",
        ator: "Operador CEMIG",
        data: "2026-06-12T14:40:00",
      },
    ],
  },
]
