import { Country } from './Country';
import { AdministrativeArea } from './AdministrativeArea';

export class AutoCompleteResult {
    Key?: string;
    LocalizedName?: string;
    Country?: Country;
    AdministrativeArea?: AdministrativeArea;

    constructor(
        Key?: string,
        LocalizedName?: string,
        Country?: Country,
        AdministrativeArea?: AdministrativeArea
    ) {}
}