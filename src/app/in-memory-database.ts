import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Category} from './pages/categories/shared/category.model';
import {Entry} from './pages/entries/shared/entry.model'
export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            {id: 1, name: 'Moradia', description: 'Pagamento de contas da casa'},
            {id: 2, name: 'Saúde', description: 'Plano de Saúde e medicamentos'},
            {id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc'},
            {id: 4, name: 'Salário', description: 'Recebimento de Salário'},
            {id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'},
        ];
        const entries: Entry[] = [
            {id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, 
            category: categories[0], paid: true, date: '10/05/2019', 
            amount: '70,80', description: 'Gás de cozina', type: 'despesa'},
            {id: 2, name: 'Salário', categoryId: categories[4].id, 
            category: categories[4], paid: true, date: '05/05/2019', 
            amount: '1500,00', description: 'Salário mensal', type: 'receita'}];
        return {categories, entries};
    }
}