const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Tag = require("../Models/tagModel");
router.post("/addRoot", async (req, res) => {
    console.log(req.body);
    const tag = new Tag({
        parentId: null,
        tagName: req.body.tagName,
        order: 0
    })
    try {
        const result = await tag.save();
        res.status(200).send({ result: String(result._id) })
    }
    catch (err) {
        res.status(500).send({ result: "error" });
    }

})
router.post("/addChild", async (req, res) => {
    console.log(req.body);
    const tag = new Tag({
        parentId: req.body.parentId,
        tagName: req.body.tagName,
        order: req.body.order
    })
    try {
        const result = await tag.save();
        res.status(200).send({ result: String(result._id) })
    }
    catch (err) {
        res.status(500).send({ result: "error" });
    }

})
router.delete("/removeChild", async (req, res) => {
    let ids = [];
    ids.push(mongoose.Types.ObjectId(req.body.parentId));
    try {

        const result = await Tag.find({ parentId: String(req.body.parentId) }).select("_id");
        for (let i = 0; i < result.length; i++) {
            ids.push(mongoose.Types.ObjectId(result[i]._id));
        }

        let temp;
        let i = 1;
        console.log("hello");
        console.log(ids.length);
        let l = ids.length;
        while (i < l) {

            temp = await Tag.find({ parentId: String(ids[i]) }).select("_id");
            console.log(i, temp, ids.length);
            console.log(temp);
            for (let j = 0; j < temp.length; j++) {
                if (ids.indexOf(temp[j]._id) == -1) {
                    ids.push(temp[j]._id);
                }

            }

            i += 1;
            l = ids.length
        }
        console.log("delete many ");
        console.log(result);
        console.log(ids);


    }
    catch (err) {
        res.status(500).send({ result: "error" });
    }
    try {
        const status = await Tag.deleteMany({ _id: { $in: ids } });
        console.log(status);
        res.status(200).send({ result: "done" });
    }
    catch (err) {
        res.status(500).send({ result: "error" });
    }
    /* console.log(mongoose.Types.ObjectId(req.body.parentId));
    const deleteParent=await Tag.deleteOne({_id:mongoose.Types.ObjectId(req.body.parentId)});
    console.log("delete one ");
    console.log(deleteParent);
    res.status(200).send({result:"done"}); */
})
router.put("/updateChild", async (req, res) => {
    console.log("req body");
    console.log(req.body);
    try {
        const newresult = await Tag.updateOne({ _id: mongoose.Types.ObjectId(req.body.parentId) }, {
            $set: {
                tagName: req.body.tagName
            }
        });
        console.log(newresult);
        res.status(200).send({ result: "done" })
    }
    catch (err) {
        res.status(500).send({ result: "error" });
    }
})
router.get("/getAll", async (req, res) => {
    try {
        const get = await Tag.find();
        console.log(get)
        res.status(200).send(get);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);

    }
})
router.put("/moveChild", async (req, res) => {
    let tags = req.body.tagName;
    tags = tags.split(".");
    console.log(tags);
    if (!isFinite(tags[1]) || tags.length != 2) {
        console.log("first");
        res.status(400).send({ result: "bad" }).end();

    }

    else {
        let records;
        try {
            records = await Tag.find();
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ result: "error" }).end();

        }
        let orders = {};
        let matchTag = {};
        let children = {};
        let roots = [];
        let matchId = {};
        for (let i = 0; i < records.length; i++) {
            matchId[String(records[i]._id)] = records[i].tagName;
            orders[String(records[i]._id)] = records[i].order;
            if (records[i].parentId == null) {

                roots.push(String(records[i]._id));
                if (matchTag.hasOwnProperty(records[i].tagName)) {
                    matchTag[records[i].tagName].push(String(records[i]._id));

                }
                else {
                    matchTag[records[i].tagName] = [];
                    matchTag[records[i].tagName].push(String(records[i]._id));
                }
                continue
            }
            if (children.hasOwnProperty(String(records[i].parentId))) {
                children[String(records[i].parentId)].push({ id: String(records[i]._id), tagName: records[i].tagName });
                if (matchTag.hasOwnProperty(records[i].tagName)) {
                    matchTag[records[i].tagName].push(String(records[i]._id));

                }
                else {
                    matchTag[records[i].tagName] = [];
                    matchTag[records[i].tagName].push(String(records[i]._id));
                }

            }
            else {
                children[String(records[i].parentId)] = [];
                if (matchTag.hasOwnProperty(records[i].tagName)) {
                    matchTag[records[i].tagName].push(String(records[i]._id));

                }
                else {
                    matchTag[records[i].tagName] = [];
                    matchTag[records[i].tagName].push(String(records[i]._id));
                }
                children[String(records[i].parentId)].push({ id: String(records[i]._id), tagName: records[i].tagName });

            }
        }
        console.log(tags);
        console.log(matchTag, children);
        if (!matchTag.hasOwnProperty(tags[0])) {
            console.log("neel")
            res.status(400).send({ result: "notFound" }).end();
        }
        else {
            if (tags[1] > matchTag[tags[0]].length) {
                console.log("id=>>");
                res.status(400).send({ result: "notFound" }).end();

            }
            else {
                let ans = { value: 0 };
                let visited = {};
                for (let i = 0; i < roots.length; i++) {
                    console.log(roots[i]);
                    visited = {};
                    console.log(ans);

                    dfsTraversal(roots[i], visited, children, matchId, tags[0], tags[1], ans);
                    if (ans["value"] == tags[1]) {
                        break;
                    }
                }

                console.log(ans);
                if (String(ans["id"]) == String(req.body.parentId)) {
                    console.log("id===");
                    res.status(400).send({ result: "bad" }).end();
                   
                }

                let ids = [];
                if (children.hasOwnProperty(String(req.body.parentId))) {
                    console.log("check properly");
                    for (let i = 0; i < children[String(req.body.parentId)].length; i++) {
                        ids.push(children[String(req.body.parentId)][i].id);
                    }

                    let iterator = 0;
                    let l = ids.length;
                    while (iterator < l) {

                        if (children.hasOwnProperty(ids[iterator])) {
                            for (let j = 0; j < children[ids[iterator]].length; j++) {
                                if (ids.indexOf(children[ids[iterator]][j].id)) {
                                    ids.push(children[ids[iterator]][j].id);
                                }

                            }
                        }

                        iterator += 1;
                        l = ids.length
                    }
                    if (ids.includes(ans["id"])) {
                        console.log("from here");
                        res.status(400).send({ result: "bad" }).end();

                    }
                    else{
                        console.log("smit");
                    let orderOfParent, orderOfChild;
                    try {
                        orderOfParent = await Tag.findOne({ _id: mongoose.Types.ObjectId(ans["id"]) }).select("order");
                        orderOfChild = await Tag.findOne({ _id: mongoose.Types.ObjectId(req.body.parentId) }).select("order");
                    }
                    catch (err) {
                        res.status(500).send({ result: "error" });

                    }
                    console.log("here");
                    const substractOrAdd = orderOfParent.order + 1 - orderOfChild.order;


                    try {
                        await Tag.updateOne({ _id: mongoose.Types.ObjectId(req.body.parentId) }, {
                            $set: {
                                parentId: String(ans["id"]),
                                order: (orderOfParent.order + 1)
                            }
                        });
                    }
                    catch (er) {
                        console.log(er);
                        res.status(500).send({ result: "error" });

                    }
                    if (children.hasOwnProperty(req.body.parentId)) {






                        console.log("almost there");
                        for (let i = 0; i < ids.length; i++) {




                            await Tag.updateOne({ _id: mongoose.Types.ObjectId(ids[i]) }, {
                                $set: {

                                    order: (orders[ids[i]] + substractOrAdd)
                                }
                            });
                        }



                        console.log(ids);
                        res.status(200).send({ result: "good" });


                    }
                    else {
                        res.status(200).send({ result: "good" });

                    }
                    }
                }
                else {
                    console.log("smit");
                    let orderOfParent, orderOfChild;
                    try {
                        orderOfParent = await Tag.findOne({ _id: mongoose.Types.ObjectId(ans["id"]) }).select("order");
                        orderOfChild = await Tag.findOne({ _id: mongoose.Types.ObjectId(req.body.parentId) }).select("order");
                    }
                    catch (err) {
                        res.status(500).send({ result: "error" });

                    }
                    console.log("here");
                    const substractOrAdd = orderOfParent.order + 1 - orderOfChild.order;


                    try {
                        await Tag.updateOne({ _id: mongoose.Types.ObjectId(req.body.parentId) }, {
                            $set: {
                                parentId: String(ans["id"]),
                                order: (orderOfParent.order + 1)
                            }
                        });
                    }
                    catch (er) {
                        console.log(er);
                        res.status(500).send({ result: "error" });

                    }
                    if (children.hasOwnProperty(req.body.parentId)) {






                        console.log("almost there");
                        for (let i = 0; i < ids.length; i++) {




                            await Tag.updateOne({ _id: mongoose.Types.ObjectId(ids[i]) }, {
                                $set: {

                                    order: (orders[ids[i]] + substractOrAdd)
                                }
                            });
                        }



                        console.log(ids);
                        res.status(200).send({ result: "good" });


                    }
                    else {
                        res.status(200).send({ result: "good" });

                    }

                }
            }
        }
    }
})
function dfsTraversal(start, visited, children, matchId, find, count, ans) {
    console.log(start);

    console.log(matchId[start], find);
    visited[start] = 1;

    if (matchId[start] == find) {

        if (ans["value"] == count) {

        }
        else {
            ans["value"] += 1;
            if (ans["value"] == count) {
                ans["id"] = start;
                console.log("return ")

            }
        }
    }
    if (children.hasOwnProperty(start)) {
        for (let i = 0; i < children[String(start)].length; i++) {
            if (!visited.hasOwnProperty(String(children[String(start)][i].id))) {
                dfsTraversal(String(children[String(start)][i].id), visited, children, matchId, find, count, ans);
            }
        }
    }

}
module.exports = router;