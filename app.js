import Inventario from "./inventario.js";
import Producto from "./producto.js";

class App
{
    constructor()
    {
        this.msjTitulo = document.getElementById("msjTitulo");
        this.msjObjeto = document.getElementById("msjObjeto");
        this.inputPosition = document.getElementById("posAdd");
        this.inputCode = document.getElementById("codeAdd");
        this.inputName = document.getElementById("nameAdd");
        this.inputUnit = document.getElementById("unitAdd");
        this.inputCost = document.getElementById("costAdd");
        this.inputSearch = document.getElementById("inputSearch");
        this.btnAdd = document.getElementById("add");
        this.btnSearch = document.getElementById("search");
        this.btnDelete = document.getElementById("delete");
        this.btnDeleteAll = document.getElementById("deleteALL");
        this.btnList = document.getElementById("list");
        this.btnInvertList = document.getElementById("invertList");
        this.table = document.getElementById("table");

        this.inventario = new Inventario();

        this.escucharEvenetos();
    }


    _getData = () =>
    {
        let code = this.inputCode.value;
        let name = this.inputName.value;
        let unit = this.inputUnit.value;
        let cost = this.inputCost.value;

        code.trim();
        name.trim();
        unit.trim();
        cost.trim();

        return (code != "" && name != "" & unit != "" && cost != "") ? new Producto(code, name, unit, cost) : null;
    }

    _agregar = () =>
    {
        let prod = this._getData();
        if(prod == null)
        {
            this.msjTitulo.innerHTML = "Error: ";
            this.msjObjeto.innerHTML = "faltan datos por rellenar!";
            return;
        }

        let agregado;

        if(this.inputPosition.value != "")
        {
            agregado = this.inventario.insertarEn(prod, this.inputPosition.value);
        }else
        {
            agregado = this.inventario.agregar(prod);
        }

        if(!agregado)
        {
            this.msjTitulo.innerHTML = "Error: ";
            this.msjObjeto.innerHTML = "no se pudo agregar el producto!";
            return;
        }

        this.msjTitulo.innerHTML = "Se agrego: ";
        this.msjObjeto.innerHTML = prod.getName();
        console.log("Cantidad de registrados: "  + this.inventario.CantidadRegistrados());
    }

    _buscar = () =>
    {
        let codigo = this.inputSearch.value;
        let enc = this.inventario.buscar(codigo);
        this.table.innerHTML = "";
        if(enc != null)
        {
            this.msjTitulo.innerHTML = "Se encontro : ";
            this.msjObjeto.innerHTML = enc.getName();
            let row = table.insertRow(-1);
            let cellCode = row.insertCell(0);
            let cellName = row.insertCell(1);
            let cellUnit = row.insertCell(2);
            let cellCost = row.insertCell(3);
            let cellTotal = row.insertCell(4); 
            
            cellCode.innerHTML = enc.getCode();
            cellName.innerHTML = enc.getName();
            cellUnit.innerHTML = enc.getUnit();
            cellCost.innerHTML = enc.getCost();
            cellTotal.innerHTML = enc.getTotalCost();
        }else
        {
            this.msjTitulo.innerHTML = "Codigo no encontrado";
            this.msjObjeto.innerHTML = "";
        }
    }

    _borrar = () =>
    {
        let codigo = this.inputSearch.value;
        let borrado = this.inventario.eliminar(codigo);
        if(borrado != null)
        {
            this.msjTitulo.innerHTML = `'${borrado.getName()}'`;
            this.msjObjeto.innerHTML = " ha sido eliminado";
        }else
        {
            this.msjTitulo.innerHTML = "Codigo no encontrado: ";
            this.msjObjeto.innerHTML = "nada eliminado";
        }
    }


    _limpiar = () =>
    {
        this.inventario.eliminarTODO();
        this._listar();
        document.getElementById("inputForm").reset();
    }

    _listar = () =>
    {
        this.msjTitulo.innerHTML = "Registros: ";
        this.msjObjeto.innerHTML = this.inventario.size;
        this.inventario.listar(this.table);
    }

    _invertList = () =>
    {
        this.msjTitulo.innerHTML = "Registros: ";
        this.msjObjeto.innerHTML = this.inventario.size;
        this.inventario.listarInverso(this.table);
    }




    escucharEvenetos()
    {
        this.btnAdd.addEventListener("click", this._agregar);
        this.btnSearch.addEventListener("click", this._buscar);
        this.btnDelete.addEventListener("click", this._borrar);
        this.btnDeleteAll.addEventListener("click", this._limpiar);
        this.btnList.addEventListener("click", this._listar);
        this.btnInvertList.addEventListener("click", this._invertList);
    }
}

new App();