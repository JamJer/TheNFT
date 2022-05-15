import { Subject } from 'rxjs';
import { Icons } from '../../../constants';

export interface Base {
    icons: typeof Icons;
    destroy$: Subject<unknown>;
}