export default class Producto
{
    constructor(code, name, unit, cost)
    {
        this.code = code;
        this.name = name;
        this.unit = unit;
        this.cost = cost;
        this.siguiente = null;
    }

    getCode()
    {
        return this.code;
    }

    getName()
    {
        return this.name;
    }

    getUnit()
    {
        return this.unit;
    }

    getCost()
    {
        return this.cost;
    }

    getTotalCost()
    {
        return this.unit * this.cost;
    }
}