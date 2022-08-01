import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PRICE_ERROR, SET_PRICE } from '../store/actions/types'

const currencies = ['USD', 'EUR', 'GBP']

// You can use axios if you want
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
	const { data, error } = useSWR(
		'https://api.coindesk.com/v1/bpi/currentprice.json',
		fetcher,
		{
			refreshInterval: 60000,
		}
	)
	const dispatch = useDispatch()

	const price = useSelector((state) => state.btcReducer.price)

	useEffect(() => {
		if (!!data) dispatch({ type: SET_PRICE, payload: data.bpi })
		if (!!error) dispatch({ type: PRICE_ERROR, payload: error })
	}, [data, error, dispatch])

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Current btc price</h1>
				<div className={styles.btcContainer}>
					{!price
						? 'Loading...'
						: currencies.map((currency) => (
								<span key={currency}>
									{`${currency}: ` +
										price[currency].rate_float}
								</span>
						  ))}
				</div>
			</main>
		</div>
	)
}