require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Caso MLB1615760527 seja passado como argumento da função, fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao passar MLB1615760527 como argumento da função, testa se a função fetch ultiliza o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Testa se o retorno da função fetchItem com o argumento MLB1615760527 é uma estrutura de dados igual ao objeto item', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toMatchObject(item);
  });
  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', () => {
    expect(fetchItem()).rejects.toThrow(new Error('You must provide an url'));
  });
});
