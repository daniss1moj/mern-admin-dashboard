import {
	Box,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Typography,
	Rating,
	useTheme,
	useMediaQuery,
	CircularProgress,
} from '@mui/material';
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';
import { useState } from 'react';

const Product = ({ _id, name, description, price, rating, category, supply, stat }) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<Card
			sx={{
				backgroundColor: theme.palette.background.alt,
				backgroundImage: 'none',
				borderRadius: '0.55rem',
			}}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
					{category}
				</Typography>
				<Typography variant="h5" component="div">
					{name}
				</Typography>
				<Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
					${Number(price).toFixed(2)}
				</Typography>
				<Rating value={rating} readOnly />
				<Typography variant="body2">{description}</Typography>
			</CardContent>
			<CardActions>
				<Button variant="primary" size="small" onClick={() => setIsExpanded(!isExpanded)}>
					See more
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{
					color: theme.palette.neutral[300],
				}}>
				<CardContent>
					<Typography>id: {_id}</Typography>
					<Typography>Supply Left: {supply}</Typography>
					<Typography>Yeraly Sales This Year: {stat.yearlySalesTotal}</Typography>
					<Typography>
						Yearly Units Solid This Year: {stat.yearlyTotalSoldUnits}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

const Products = () => {
	const { data, isLoading } = useGetProductsQuery();
	const isNonMobile = useMediaQuery('(min-width:1000px)');
	const theme = useTheme();

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="PRODUCTS" subtitle="See your list of products." />

			{data || !isLoading ? (
				<Box
					mt="20px"
					display="grid"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					gap="20px"
					sx={{
						'& > div': {
							gridColumn: isNonMobile ? undefined : 'span 4',
						},
					}}>
					{data.productsWithStat.map(
						({ _id, name, description, price, rating, category, supply, stat }) => {
							return (
								<Product
									key={_id}
									_id={_id}
									name={name}
									description={description}
									price={price}
									rating={rating}
									category={category}
									supply={supply}
									stat={stat}
								/>
							);
						},
					)}
				</Box>
			) : (
				<Box display="flex" justifyContent="center" alignItems="center">
					<CircularProgress
						sx={{
							color: theme.palette.primary.light,
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Products;
