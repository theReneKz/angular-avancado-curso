import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Category} from './pages/categories/shared/category.model';
import {Entry} from './pages/entries/shared/entry.model'
export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            {id: 1, name: 'Moradia', description: 'Pagamento de contas da casa'},
            {id: 2, name: 'Saúde', description: 'Plano de Saúde e medicamentos'},
            {id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc'},
            {id: 4, name: 'Automóvel', description: 'Combustível, '},
            {id: 5, name: 'Salário', description: 'Recebimento de Salário'},
            {id: 6, name: 'Freelas', description: 'Trabalhos como freelancer'},
        ];
        const entries: Entry[] = [
            {id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, 
            category: categories[0], paid: true, date: '10/05/2019', 
            amount: '70,80', description: 'Gás de cozina', type: Entry.types.expense},
            {id: 2, name: 'Salário', categoryId: categories[4].id, 
            category: categories[4], paid: true, date: '05/05/2019', 
            amount: '1500,00', description: 'Salário mensal', type: Entry.types.renevue},
            {id: 3, name: 'Gasolina', categoryId: categories[3].id, 
            category: categories[3], paid: true, date: '10/05/2019', 
            amount: '100,00', type: Entry.types.expense},
            {id: 4, name: 'Serviço', categoryId: categories[5].id, 
            category: categories[5], paid: false, date: '10/05/2019', 
            amount: '2000,00', type: Entry.types.renevue, description:"Pagamento da construção do app"},
            {id: 5, name: 'Medicamentos', categoryId: categories[1].id, 
            category: categories[1], paid: false, date: '10/04/2019', 
            amount: '20,00', type: Entry.types.expense, description:"Medicamentos"}
        ];
        return {categories, entries};
    }
}