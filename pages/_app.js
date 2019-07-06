import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	componentDidCatch(error, errorInfo) {
		super.componentDidCatch(error, errorInfo);
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<Head>
					<title>Amazing Next Boilerplate</title>
				</Head>
				<Component {...pageProps} />
			</Container>
		);
	}
}

export default MyApp;
