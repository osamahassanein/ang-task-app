export interface Task {
        sid?: number;
        createdBy?: string;
        creationDate?: Date;
        lastUpdateDate?: Date;
        lastUpdatedBy?: string;
        operatorCode: string;
        operatorName: string;
        operatorKeys?: [];
        operatorAccounts?: [];
        invoicingStartDay: number;
        invoicingEndDay: number;
        invoicingOffsetMonths: number;
    }
