/**
 * Printa no console uma query SQL e seus parâmetros, usando uma expressão regular para substituí-los.
 * Os parâmetros devem ter sido referenciados como "$1", "$2" e etc (sem aspas) na query para que a função funcione.
 * @param fullSqlQuery A query SQL a ser printada no console.
 * @param queryParams A lista de parâmetros da query SQL.
 */
export function printSqlAndParams(
    fullSqlQuery: string,
    queryParams: any[],
  ): void {
    queryParams.forEach((param, index) => {
      const regex = new RegExp(`\\B\\$${index + 1}\\b`, 'gm');
  
      fullSqlQuery = fullSqlQuery.replace(regex, param);
    });
  
    console.log(fullSqlQuery); // NÃO REMOVER
  }