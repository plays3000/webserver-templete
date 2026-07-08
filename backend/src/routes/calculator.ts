import {Router} from 'express';
import type{Request, Response} from 'express';
import type {CalculatorRequestBody} from '../types/calculator.js';
import { validateCalculatorRequest } from '../middlewares/index.js';

export const router = Router();


router.get('/', (req: Request, res: Response) => {
    // throw new Error ('Application error');
    res.send({
        message : 'Get all calculations', 
        timestamp: req.timestamp,
        data : [
            {id:1, result:1}, 
            {id:2, result:2}
        ]
    });
});


router.get('/:id', (req: Request, res: Response) => {
    res.send({message : 'Get calculation by ID', 
        id: req.params.id, 
        timestamp: req.timestamp,
        result: 1
    });
});

router.post('/', validateCalculatorRequest, (req: Request<{}, any, CalculatorRequestBody>, res: Response) => {
    const {operator, operand1, operand2} = req.body;
    let result: number|string;
    switch(operator){
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;

        case '*':
            result = operand1 * operand2;
            break;

        case '/':
            result = operand1 / operand2;
            break;

        default:
            result = "Invalid operator";
            break;
    }
    res.send({
        message: "Create new calculation",
        timestamp: req.timestamp,
        result,
    })
});