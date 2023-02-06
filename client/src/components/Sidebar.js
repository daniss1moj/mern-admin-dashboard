import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	ReceiptLongOutlined,
	PublicOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
	{ text: 'Dashboard', icon: <HomeOutlined /> },
	{ text: 'Client Facing', icon: null },
	{ text: 'Products', icon: <ShoppingCartOutlined /> },
	{ text: 'Customers', icon: <Groups2Outlined /> },
	{ text: 'Transactions', icon: <ReceiptLongOutlined /> },
	{ text: 'Geography', icon: <PublicOutlined /> },
	{ text: 'Sales', icon: null },
	{ text: 'Overview', icon: <PointOfSaleOutlined /> },
	{ text: 'Daily', icon: <TodayOutlined /> },
	{ text: 'Monthly', icon: <CalendarMonthOutlined /> },
	{ text: 'Breakdown', icon: <PieChartOutlined /> },
	{ text: 'Management', icon: null },
	{ text: 'Admin', icon: <AdminPanelSettingsOutlined /> },
	{ text: 'Performance', icon: <TrendingUpOutlined /> },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile, user }) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav">
			<AnimatePresence>
				{isSidebarOpen && (
					<motion.div
						key="sidebar"
						style={{
							height: '100vh',
						}}
						initial={{
							x: -200,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						exit={{
							x: -200,
							opacity: 0,
						}}
						transition={{
							duration: 0.8,
							ease: 'easeInOut',
						}}>
						<Drawer
							open={isSidebarOpen}
							onClose={() => setIsSidebarOpen(false)}
							variant="persistent"
							anchor="left"
							sx={{
								width: drawerWidth,
								'& .MuiPaper-root': {
									width: drawerWidth,
								},
								'& .MuiDrawer-paper': {
									color: theme.palette.secondary[200],
									backgroundColor: theme.palette.background.alt,
									boxSizing: 'border-box',
									borderWidth: isNonMobile ? 0 : '2px',
								},
							}}>
							<Box width="100%">
								<Box m="1.5rem 2rem 2rem 3rem">
									<FlexBetween color={theme.palette.secondary.maim}>
										<Box display="flex" alignItems="center" fontWeight="bold">
											<Typography variant="h4" fontWeight="boldd">
												ECOMVISION
											</Typography>
										</Box>
										{!isNonMobile && (
											<IconButton
												onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
												<ChevronLeft />
											</IconButton>
										)}
									</FlexBetween>
								</Box>
								<List>
									{navItems.map(({ text, icon }) => {
										if (!icon) {
											return (
												<Typography
													key={text}
													sx={{ m: '2.25rem 0 1rem 3rem' }}>
													{text}
												</Typography>
											);
										}
										const lcText = text.toLowerCase();
										return (
											<ListItem key={text} disablePadding>
												<ListItemButton
													onClick={() => {
														navigate(`/${lcText}`);
													}}
													sx={{
														backgroundColor:
															active === lcText
																? theme.palette.secondary[300]
																: 'transparent',
														color:
															active === lcText
																? theme.palette.primary[600]
																: theme.palette.secondary[1000],
													}}>
													<ListItemIcon
														sx={{
															ml: '2rem',
															color:
																active === lcText
																	? theme.palette.primary[600]
																	: theme.palette.secondary[200],
														}}>
														{icon}
													</ListItemIcon>
													<ListItemText primary={text} />
													{active === lcText && (
														<ChevronRightOutlined sx={{ ml: 'auto' }} />
													)}
												</ListItemButton>
											</ListItem>
										);
									})}
								</List>
								<Box>
									<Divider />
									<FlexBetween
										textTransform="none"
										gap="1rem"
										m="1.5rem 2rem 0 2rem">
										<Box
											component="img"
											alt="profile"
											src={profileImage}
											height="40px"
											width="40px"
											borderRadius="50%"
											sx={{ objectFit: 'cover' }}
										/>
										<Box textAlign="left">
											<Typography
												fontWeight="bold"
												fontSize="0.9rem"
												sx={{
													color: theme.palette.secondary[100],
												}}>
												{user.name && user.name}
											</Typography>
											<Typography
												fontWeight="bold"
												fontSize="0.9rem"
												sx={{
													color: theme.palette.secondary[200],
												}}>
												{user.occupation && user.occupation}
											</Typography>
										</Box>
										<SettingsOutlined
											sx={{
												color: theme.palette.secondary[300],
												fontSize: '25px',
											}}
										/>
									</FlexBetween>
								</Box>
							</Box>
						</Drawer>
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	);
};

export default Sidebar;
