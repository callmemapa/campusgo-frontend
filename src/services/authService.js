export const postUser = async (user) => {
    try {
        const response = await fetch('BASEURL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting user: ', error);
        throw error;
    }
};