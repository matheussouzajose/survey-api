import { type LogErrorRepository } from '../../../../data/protocols/log-error-repository'

export class LogMongoRepository implements LogErrorRepository {
    log(error: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}
