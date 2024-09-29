import { AppState, Alert, View, StyleSheet } from 'react-native'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { Input, Button } from 'react-native-elements'

// Tells supabase auth to continuously refresh the session automatically if the app is in the foreground.
// When this is added, you will continue to receive onAuthStateChange events with the TOKEN_REFRESHED or SIGNED_OUT event if the user's session is terminated.
// This should only be registered once.
AppState.addEventListener('change', async (state) => {
    if (state === 'active') {
        await supabase.auth.startAutoRefresh()
    } else {
        await supabase.auth.stopAutoRefresh()
    }
})

export default function Authentification() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function signInWithEmailAndPassword() {
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.log('error', error)
            Alert.alert(error.message)
        }

        setLoading(false)
    }

    async function signUpWithEmailAndPassword() {
        setLoading(true)

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({ email, password })

        if (error) {
            console.log('error', error)
            Alert.alert(error.message)
        }

        if (!session)
            Alert.alert('Please check your inbox for email verification')

        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title="Sign in"
                    disabled={loading}
                    onPress={() => signInWithEmailAndPassword()}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Sign up"
                    disabled={loading}
                    onPress={() => signUpWithEmailAndPassword()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})
