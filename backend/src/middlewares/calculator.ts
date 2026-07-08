import type{Request, Response, NextFunction} from 'express';
import type {CalculatorRequestBody} from '../types/calculator.js';

export function validateCalculatorRequest(req: Request<{}, {}, CalculatorRequestBody>, res: Response, next: NextFunction){
    const {operator, operand1, operand2} = req.body;

    if (typeof operand1 !== 'number' || typeof operand2 !== 'number'){
        return res.status(400).send("Operands must be numbers");
    }

    if (operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/' ){
        return res.status(400).send('Operator nmust be one of "+","-","*","/"')
    }

    next();
}