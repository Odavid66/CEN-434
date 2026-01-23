import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

interface NewsItem {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    source: {
    name: string;
    };
}

const NewsAggregator = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchNews = async () => {
        try {
        const response = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&apiKey=f68e18faddd14420967c4aaa0d33f918'
        );
        const data = await response.json();

        if (data.status === 'ok') {
            setNews(data.articles);
        } else {
            console.error('Error fetching news:', data.message);
        }
        } catch (error) {
        console.error('Error fetching news:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchNews();
    }, []);

    const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
        style={styles.newsItem}
        onPress={() => Linking.openURL(item.url)}
        activeOpacity={0.85}
    >
        {item.urlToImage ? (
        <Image
            source={{ uri: item.urlToImage }}
            style={styles.newsImage}
            resizeMode="cover"
        />
        ) : null}

        <Text style={styles.newsTitle}>{item.title}</Text>

        {item.description ? (
        <Text style={styles.newsDescription}>{item.description}</Text>
        ) : null}

        <Text style={styles.newsSource}>
        {item.source.name} ·{' '}
        {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
    </TouchableOpacity>
    );

    return (
    <View style={styles.container}>
        <Text style={styles.title}>News Aggregator</Text>

        {loading ? (
        <ActivityIndicator size="large" color="#1e293b" />
        ) : (
        <FlatList
            data={news}
            keyExtractor={(item) => item.url}
            renderItem={renderNewsItem}
            showsVerticalScrollIndicator={false}
        />
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f8',
    width: '80%',
    alignSelf: 'center',
    },

    title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1e293b',
    letterSpacing: 0.5,
    },

    newsItem: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 400,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    },

    newsImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e5e7eb',
    },

    newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    margin: 14,
    marginBottom: 6,
    lineHeight: 24,
    },

    newsDescription: {
    fontSize: 14,
    color: '#475569',
    marginHorizontal: 14,
    marginBottom: 10,
    lineHeight: 20,
    },

    newsSource: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'right',
    marginHorizontal: 14,
    marginBottom: 12,
    },
});

export default NewsAggregator;
