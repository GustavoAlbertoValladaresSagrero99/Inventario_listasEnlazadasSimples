import Producto from "./producto.js";

export default class Inventario
{
    constructor()
    {
        this.inicio = null;
        this.size = 0;
    }

    CantidadRegistrados()
    {
        return this.size;
    }

    agregar(nuevo)
    {
        if(this.buscar(nuevo.getCode()) != null) return null;
        if (this.inicio == null)
        {
            this.inicio = nuevo;
        }else
        {
            let aux = this.inicio;
            while(aux.siguiente != null)
            {
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
        }

        this.size++;
        return nuevo;
    }

    insertarEn(nuevo, index)
    {
        index = Number(index);
        if(index < 0 || index > this.size) return false;
        if(this.inicio == null)
        {
            this.inicio = nuevo;
            this.size++;
            return true;
        }
 
        let actual = this.inicio;
        let anterior;
        if (index == 0)
        {
            nuevo.siguiente = actual;
            this.inicio = nuevo;
            return true;
        }else
        
        for(let i = 0; i < index; i++)
        {
            anterior = actual;
            actual = actual.siguiente;
        }

        nuevo.siguiente = actual;
        anterior.siguiente = nuevo;

        this.size++;
        return true;
    }

    buscar(codigo)
    {
        if(this.inicio == null) return null;
        let encontrado = null;
        let temp = this.inicio;
        while(temp != null)
        {
            if(temp.getCode() == codigo)
            {
                encontrado = temp;
                break;
            }
            temp = temp.siguiente;
        }
        return encontrado;
    }



    eliminar(codigo){
        if(this.inicio == null) return null;

        if (this.inicio.getCode() == codigo)
        {
           this.inicio = this.inicio.siguiente;
           this.size--;
           return this.inicio;
        }

        let actual = this.inicio.siguiente;
        let anterior = this.inicio;


        while(actual)
        {
            if(actual.getCode() == codigo) break;
            anterior = actual;
            actual = actual.siguiente;
        }
        if(actual)
        {
            anterior.siguiente = actual.siguiente;
            this.size--;
            return actual;
        }
      }


      eliminarTODO()
      {
          this.inicio = null;
          this.size = 0;
      }

      listar(table)
      {
        table.innerHTML = '';
        if(this.inicio == null) return;
        
        let temp = this.inicio;

        for(let i = 0; i < this.size; i++) 
        {

                let row = table.insertRow(-1);
                let cellCode = row.insertCell(0);
                let cellName = row.insertCell(1);
                let cellUnit = row.insertCell(2);
                let cellCost = row.insertCell(3);
                let cellTotal = row.insertCell(4); 
                
                cellCode.innerHTML = temp.getCode();
                cellName.innerHTML = temp.getName();
                cellUnit.innerHTML = temp.getUnit();
                cellCost.innerHTML = temp.getCost();
                cellTotal.innerHTML = temp.getTotalCost();
            if(temp != null)
            {
                temp = temp.siguiente;
            }

        }
      }

      listarInverso(table)
      {
        table.innerHTML = "";
        if(this.inicio == null) return;
        
        let temp = this.inicio;

        for(let i = this.size; i > 0; i--) 
        {
            console.log(i);

            if(temp != null)
            {
                let row = table.insertRow(-1);
                let cellCode = row.insertCell(0);
                let cellName = row.insertCell(1);
                let cellUnit = row.insertCell(2);
                let cellCost = row.insertCell(3);
                let cellTotal = row.insertCell(4); 
                
                cellCode.innerHTML = temp.getCode();
                cellName.innerHTML = temp.getName();
                cellUnit.innerHTML = temp.getUnit();
                cellCost.innerHTML = temp.getCost();
                cellTotal.innerHTML = temp.getTotalCost();
            }
            temp = temp.siguiente;

        }
      }
}






