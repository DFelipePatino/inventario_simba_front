import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortPrices, sortStock } from "../redux/actions";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from "@mui/material";

const Sort = () => {
    const dispatch = useDispatch();

    const [priceOrder, setPriceOrder] = useState("A");
    const [stockOrder, setStockOrder] = useState("T");

    const handlePriceOrderChange = (e) => {
        setPriceOrder(e.target.value);
        dispatch(sortPrices(e.target.value));
    };

    const handleStockChange = (e) => {
        setStockOrder(e.target.value);
        dispatch(sortStock(e.target.value));
    };

    return (
        <div className="Sort">
            <Typography variant="h6">Ordenar por:</Typography>

            <br />

            <FormControl variant="outlined" style={{ width: '200px' }}>
                <InputLabel htmlFor="price-order-select">Precio</InputLabel>
                <Select
                    value={priceOrder}
                    onChange={handlePriceOrderChange}
                    label="Precio"
                    inputProps={{
                        id: 'price-order-select',
                    }}
                >
                    <MenuItem value="A">Menor a Mayor</MenuItem>
                    <MenuItem value="D">Mayor a Menor</MenuItem>
                </Select>
            </FormControl>

            <br />
            <br />

            <FormControl variant="outlined" style={{ width: '200px' }}>
                <InputLabel htmlFor="stock-order-select">Stock</InputLabel>
                <Select
                    value={stockOrder}
                    onChange={handleStockChange}
                    label="Stock"
                    inputProps={{
                        id: 'stock-order-select',
                    }}
                >
                    <MenuItem value="T">Todos</MenuItem>
                    <MenuItem value="A">Disponibles</MenuItem>
                    <MenuItem value="D">Agotados</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Sort;
