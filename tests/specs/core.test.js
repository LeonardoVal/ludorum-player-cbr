﻿/* 
*/
define(['creatartis-base', 'ludorum', 'ludorum-player-cbr'], function (base, ludorum, ludorumCBR) {

	describe("Library", function () { /////////////////////////////////////////////////////////////
		it("layout", function () {
			expect(typeof ludorumCBR.CaseBase).toBe('function');
			expect(typeof ludorumCBR.CBRPlayer).toBe('function');
			expect(typeof ludorumCBR.dbs).toBe('object');
		});
	}); // layout

	describe("Case bases with TicTacToe", function () { ///////////////////////////////////////////
		/*
		*/
		var game = new ludorum.games.TicTacToe();

		it("populate MemoryCaseBase", function (done) {
			var memCB = new ludorumCBR.dbs.MemoryCaseBase({ 
				game: game, 
				Case: ludorumCBR.games.TicTacToe.DirectCase 
			});
			expect(memCB.cases().toArray().length).toBe(0);
			memCB.populate({ n: 1 }).then(function () {
				expect(memCB.cases().toArray().length).toBeGreaterThan(0);
				done();
			});
		});

		it("playing CBRPlayer with empty case base", function (done) {
			var memCB = new ludorumCBR.dbs.MemoryCaseBase({ 
					game: game, 
					Case: ludorumCBR.games.TicTacToe.DirectCase
				}),
				cbrPlayer = new ludorumCBR.CBRPlayer({ caseBase: memCB, k: 10 }),
				match = new ludorum.Match(game, [cbrPlayer, cbrPlayer]);
			match.run().then(function () {
				expect(match.history.length).toBeGreaterThan(4);
				done();
			});
		});

		it("playing CBRPlayer with populated case base", function (done) {
			var memCB = new ludorumCBR.dbs.MemoryCaseBase({ 
					game: game, 
					Case: ludorumCBR.games.TicTacToe.DirectCase
				});
			memCB.populate({ n: 5 }).then(function () {
				var cbrPlayer = new ludorumCBR.CBRPlayer({ caseBase: memCB, k: 5 }),
					match = new ludorum.Match(game, [cbrPlayer, cbrPlayer]);
				match.run().then(function () {
					expect(match.history.length).toBeGreaterThan(4);
					done();
				});
			});
		});
	}); // Case bases with TicTacToe.

}); // define.
