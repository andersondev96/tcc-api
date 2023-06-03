const customMessage = (field: string) => {
  return {
    "string.empty": `O campo ${field} não pode ser vazio!`,
    "string.base": `O campo ${field} deve ser um texto`,
    "string.dataUri": `O campo ${field} deve ser uma URI de dados`,
    "string.domain": `O campo ${field} deve ser um nome de domínio válido`,
    "string.email": `O campo ${field} deve ser um e-mail válido`,
    "string.length": `O campo ${field} deve ter exatamente {{#limit}} caracteres`,
    "string.max": `O ${field} deve ser menor ou igual que {{#limit}} caracteres`,
    "string.min": `O campo ${field} deve ter de pelo menos {{#limit}} caracteres`,
    "string.uri": `O campo ${field} deve ser uma URL válida`,
    "array.base": `O campo ${field} deve ser um array`,
    "array.max": `O campo ${field} deve conter no máximo {{#limit}} itens`,
    "array.min": `O campo ${field} deve conter pelo menos {{#limit}} itens`,
    "array.unique": `O campo ${field} contém um item duplicado`,
    "boolean.base": `O campo ${field} deve ser um booleano`,
    "date.base": `O campo ${field} deve ser uma data válida.`,
    "date.format": `O campo ${field} deve estar no formato: {msg("date.format." + #format) || #format}`,
    "date.greater": `O campo ${field} deve ser maior que {{:#limit}}`,
    "date.less": `O campo ${field} deve ser menor que {{:#limit}}`,
    "date.max": `O campo ${field} deve ser menor que ou igual a {{:#limit}}`,
    "date.min": `O campo ${field} deve ser maior que ou igual a {{:#limit}}`,
    "number.base": `O campo ${field} deve ser um número`,
    "number.greater": `O campo ${field} deve ser maior que {{#limit}}`,
    "number.integer": `O campo ${field} deve ser um número inteiro`,
    "number.less": `O campo ${field} deve ser menor que {{#limit}}`,
    "number.max": `O campo ${field} deve ser menor ou igual a {{#limit}}`,
    "number.min": `O campo ${field} deve ser maior ou igual a {{#limit}}`,
    "any.required": `O campo ${field} é obrigatório`
  };
};

export { customMessage };