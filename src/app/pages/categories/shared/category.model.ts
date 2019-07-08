import {BaseResourceModel} from '../../../shared/models/base-resource.model'
export class Category extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string
    ) {super(); }

    static instance(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}
