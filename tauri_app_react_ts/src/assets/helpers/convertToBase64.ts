async function convertToBase64(files: FileList): Promise<string[]> {
	const readers = Array.from(files).map(
		(file) =>
			new Promise<string>((resolve) => {
				const reader = new FileReader()
				reader.onload = () => resolve(reader.result as string)
				reader.readAsDataURL(file)
			})
	)

	return await Promise.all(readers)
}

export default convertToBase64