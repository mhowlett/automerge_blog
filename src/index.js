import Automerge from 'automerge';

let doc1 = Automerge.from({ cards: [] })

doc1 = Automerge.change(doc1, 'Add card', doc => {
    doc.cards.push({ title: 'Rewrite everything in Clojure', done: false })
});

doc1 = Automerge.change(doc1, 'Add another card', doc => {
    doc.cards.insertAt(0, { title: 'Rewrite everything in Haskell', done: false })
});

let doc2 = Automerge.init()
doc2 = Automerge.merge(doc2, doc1)

doc1 = Automerge.change(doc1, 'Mark card as done', doc => {
    doc.cards[0].done = true
});

doc2 = Automerge.change(doc2, 'Delete card', doc => {
    delete doc.cards[1]
});

let finalDoc = Automerge.merge(doc1, doc2)

let changes = Automerge.getChanges(doc1, finalDoc);
console.log(changes);

console.log(Automerge.getHistory(finalDoc).map(state => [state.change.message, state.snapshot.cards.length]));

console.log(Automerge.save(finalDoc));

