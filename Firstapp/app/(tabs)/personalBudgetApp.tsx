import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Button,
} from 'react-native';

interface LedgerItem {
    id: number;
    label: string;
    value: number;
}

const BudgetTracker = () => {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [ledger, setLedger] = useState<LedgerItem[]>([]);
    const [entryLabel, setEntryLabel] = useState('');
    const [entryValue, setEntryValue] = useState('');
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
    const spent = ledger.reduce((total, item) => total + item.value, 0);
    setNetBalance(monthlyIncome - spent);
    }, [monthlyIncome, ledger]);

    const handleAddExpense = () => {
    if (entryLabel && entryValue) {
        setLedger(prev => [
        ...prev,
        {
            id: Date.now(),
            label: entryLabel,
            value: parseFloat(entryValue),
        },
        ]);
        setEntryLabel('');
        setEntryValue('');
    }
    };

    const loadMockTransactions = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();

        const simulated = data.slice(0, 3).map((item: any, idx: number) => ({
        id: Date.now() + idx,
        label: `Transaction ${item.id}`,
        value: Math.random() * 100,
        }));

        setLedger(prev => [...prev, ...simulated]);
    } catch (err) {
        console.error(err);
    }
    };

    const renderItem = ({ item }: { item: LedgerItem }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{item.label}</Text>
        <Text style={styles.rowAmount}>₦{item.value.toFixed(2)}</Text>
    </View>
    );

    return (
    <View style={styles.page}>
        <Text style={styles.heading}>Budget Tracker</Text>

        <View style={styles.card}>
        <TextInput
            style={styles.input}
            placeholder="Monthly income"
            keyboardType="numeric"
            value={monthlyIncome.toString()}
            onChangeText={t => setMonthlyIncome(parseFloat(t) || 0)}
        />

        <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceValue}>₦{netBalance.toFixed(2)}</Text>
        </View>

        <TextInput
            style={styles.input}
            placeholder="Expense name"
            value={entryLabel}
            onChangeText={setEntryLabel}
        />

        <TextInput
            style={styles.input}
            placeholder="Expense amount"
            keyboardType="numeric"
            value={entryValue}
            onChangeText={setEntryValue}
        />

        <View style={styles.actions}>
            <Button title="Add Expense" onPress={handleAddExpense} />
            <Button title="Fetch Transactions" onPress={loadMockTransactions} />
        </View>
        </View>

        <FlatList
        data={ledger}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    page: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9',
    },

    heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
    color: '#0f172a',
    },

    card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    },

    input: {
    height: 50,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
    },

    balanceBox: {
    backgroundColor: '#ecfdf5',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    },

    balanceLabel: {
    fontSize: 13,
    color: '#047857',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
    },

    balanceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065f46',
    },

    actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 10,
    },

    list: {
    marginTop: 4,
    },

    row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    },

    rowLabel: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    },

    rowAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b91c1c',
    marginLeft: 12,
    },
});

export default BudgetTracker;
